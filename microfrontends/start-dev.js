#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando todos os microfrontends...');
console.log('====================================');

// Configuração dos serviços
const services = [
  {
    name: 'Rick & Morty Microfrontend',
    emoji: '👽',
    port: 3002,
    dir: 'rick-morty-microfrontend',
    color: '\x1b[36m' // Cyan
  },
  {
    name: 'Auth Microfrontend', 
    emoji: '🔐',
    port: 3001,
    dir: 'auth-microfrontend',
    color: '\x1b[33m' // Yellow
  },
  {
    name: 'Shell App',
    emoji: '🏠', 
    port: 3000,
    dir: 'shell-app',
    color: '\x1b[32m' // Green
  }
];

const processes = [];

// Função para verificar se uma porta está em uso
function checkPort(port) {
  return new Promise((resolve) => {
    const { exec } = require('child_process');
    exec(`lsof -Pi :${port} -sTCP:LISTEN -t`, (error, stdout) => {
      resolve(stdout.trim() !== '');
    });
  });
}

// Função para iniciar um serviço
function startService(service, delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${service.color}${service.emoji} Iniciando ${service.name} (porta ${service.port})...\x1b[0m`);
      
      const child = spawn('npm', ['start'], {
        cwd: path.join(__dirname, service.dir),
        stdio: ['ignore', 'pipe', 'pipe'],
        shell: true
      });

      // Capturar saída do processo
      child.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('webpack compiled') || output.includes('Local:') || output.includes('compiled successfully')) {
          console.log(`${service.color}✅ ${service.name} iniciado com sucesso!\x1b[0m`);
        }
      });

      child.stderr.on('data', (data) => {
        const error = data.toString();
        if (!error.includes('WARNING') && !error.includes('deprecated')) {
          console.log(`${service.color}⚠️  ${service.name}: ${error}\x1b[0m`);
        }
      });

      child.on('close', (code) => {
        console.log(`${service.color}🔴 ${service.name} encerrado (código: ${code})\x1b[0m`);
      });

      processes.push({ name: service.name, process: child });
      resolve();
    }, delay);
  });
}

// Função principal
async function main() {
  // Verificar portas
  console.log('🔍 Verificando portas...');
  
  for (const service of services) {
    const inUse = await checkPort(service.port);
    if (inUse) {
      console.log(`❌ Porta ${service.port} já está em uso! Finalize o processo antes de continuar.`);
      process.exit(1);
    }
  }
  
  console.log('✅ Todas as portas estão disponíveis!\n');

  // Iniciar serviços com delay
  await startService(services[0], 0);     // Rick & Morty primeiro
  await startService(services[1], 3000);  // Auth depois de 3s
  await startService(services[2], 6000);  // Shell depois de 6s

  console.log('\n🎉 Todos os microfrontends foram iniciados!');
  console.log('\n📋 Status dos serviços:');
  console.log('   🏠 Shell App:         http://localhost:3000');
  console.log('   🔐 Auth Micro:        http://localhost:3001');  
  console.log('   👽 Rick&Morty Micro:  http://localhost:3002');
  console.log('\n⏰ Aguarde alguns segundos para todos os serviços iniciarem completamente.');
  console.log('🌐 Acesse: http://localhost:3000');
  console.log('\n💡 Para parar todos os serviços, pressione Ctrl+C\n');

  // Aguardar um pouco e abrir o navegador
  setTimeout(() => {
    const { exec } = require('child_process');
    exec('which xdg-open', (error) => {
      if (!error) {
        console.log('🌐 Abrindo navegador...');
        exec('xdg-open http://localhost:3000');
      }
    });
  }, 10000);
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