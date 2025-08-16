#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

console.log('🚀 Iniciando microfrontends sequencialmente...');
console.log('===============================================');

const services = [
  {
    name: 'Rick & Morty Microfrontend',
    emoji: '👽',
    port: 3002,
    dir: 'rick-morty-microfrontend',
    color: '\x1b[36m', // Cyan
    checkPath: '/'
  },
  {
    name: 'Auth Microfrontend', 
    emoji: '🔐',
    port: 3001,
    dir: 'auth-microfrontend',
    color: '\x1b[33m', // Yellow
    checkPath: '/remoteEntry.js'
  },
  {
    name: 'Shell App',
    emoji: '🏠', 
    port: 3000,
    dir: 'shell-app',
    color: '\x1b[32m', // Green
    checkPath: '/'
  }
];

const processes = [];

// Função para verificar se um serviço está respondendo
function checkService(port, path = '/') {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: port,
      path: path,
      method: 'GET',
      timeout: 1000
    };

    const req = http.request(options, (res) => {
      resolve(res.statusCode === 200);
    });

    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Função para aguardar um serviço ficar pronto
function waitForService(service, maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const check = async () => {
      attempts++;
      const isReady = await checkService(service.port, service.checkPath);
      
      if (isReady) {
        console.log(`${service.color}✅ ${service.name} está pronto!\x1b[0m`);
        resolve();
      } else if (attempts >= maxAttempts) {
        console.log(`${service.color}❌ ${service.name} não ficou pronto após ${maxAttempts} tentativas\x1b[0m`);
        reject(new Error(`${service.name} timeout`));
      } else {
        console.log(`${service.color}⏳ Aguardando ${service.name}... (${attempts}/${maxAttempts})\x1b[0m`);
        setTimeout(check, 2000);
      }
    };
    
    check();
  });
}

// Função para iniciar um serviço
function startService(service) {
  return new Promise((resolve, reject) => {
    console.log(`${service.color}${service.emoji} Iniciando ${service.name} (porta ${service.port})...\x1b[0m`);
    
    const child = spawn('npm', ['start'], {
      cwd: path.join(__dirname, service.dir),
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true
    });

    let hasStarted = false;

    // Capturar saída do processo
    child.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('webpack compiled') || output.includes('Local:') || output.includes('compiled successfully')) {
        if (!hasStarted) {
          hasStarted = true;
          console.log(`${service.color}🚀 ${service.name} compilado com sucesso!\x1b[0m`);
        }
      }
    });

    child.stderr.on('data', (data) => {
      const error = data.toString();
      if (error.includes('ERROR') || error.includes('Failed')) {
        console.log(`${service.color}❌ ${service.name}: ${error}\x1b[0m`);
      }
    });

    child.on('close', (code) => {
      console.log(`${service.color}🔴 ${service.name} encerrado (código: ${code})\x1b[0m`);
    });

    processes.push({ name: service.name, process: child, service });
    
    // Aguardar o serviço ficar pronto
    setTimeout(async () => {
      try {
        await waitForService(service);
        resolve();
      } catch (error) {
        reject(error);
      }
    }, 3000);
  });
}

// Função principal
async function main() {
  console.log('🔍 Verificando portas...');
  
  // Verificar se alguma porta está em uso
  for (const service of services) {
    const inUse = await checkService(service.port);
    if (inUse) {
      console.log(`⚠️  Porta ${service.port} já está em uso. Parando processo...`);
      // Tentar parar o processo
      const { exec } = require('child_process');
      exec(`lsof -ti:${service.port} | xargs kill -9`, () => {});
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('✅ Portas verificadas!\n');

  // Iniciar serviços sequencialmente
  for (const service of services) {
    try {
      await startService(service);
      console.log(`${service.color}✨ ${service.name} pronto para uso!\x1b[0m\n`);
    } catch (error) {
      console.log(`❌ Falha ao iniciar ${service.name}: ${error.message}`);
      process.exit(1);
    }
  }

  console.log('🎉 Todos os microfrontends estão rodando!');
  console.log('\n📋 Status dos serviços:');
  console.log('   🏠 Shell App:         http://localhost:3000');
  console.log('   🔐 Auth Micro:        http://localhost:3001');  
  console.log('   👽 Rick&Morty Micro:  http://localhost:3002');
  console.log('\n🌐 Acesse: http://localhost:3000');
  console.log('\n💡 Para parar todos os serviços, pressione Ctrl+C\n');

  // Abrir navegador após alguns segundos
  setTimeout(() => {
    const { exec } = require('child_process');
    exec('which xdg-open', (error) => {
      if (!error) {
        console.log('🌐 Abrindo navegador...');
        exec('xdg-open http://localhost:3000');
      }
    });
  }, 3000);
}

// Manipular encerramento
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando todos os serviços...');
  
  processes.forEach(({ name, process }) => {
    console.log(`🔴 Parando ${name}...`);
    process.kill('SIGTERM');
  });
  
  setTimeout(() => {
    console.log('👋 Todos os serviços foram encerrados!');
    process.exit(0);
  }, 2000);
});

// Executar
main().catch(console.error);