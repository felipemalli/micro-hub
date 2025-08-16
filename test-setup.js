#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Testando configuração dos microfrontends...');
console.log('===============================================');

// Função para testar um microfrontend
function testMicrofrontend(name, dir, port) {
  return new Promise((resolve) => {
    console.log(`🔍 Testando ${name}...`);
    
    const child = spawn('npm', ['run', 'build'], {
      cwd: path.join(__dirname, dir),
      stdio: 'pipe',
      shell: true
    });

    let output = '';
    let hasError = false;

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      const error = data.toString();
      if (error.includes('ERROR') || error.includes('Failed')) {
        hasError = true;
        console.log(`❌ ${name}: ${error}`);
      }
    });

    child.on('close', (code) => {
      if (code === 0 && !hasError) {
        console.log(`✅ ${name}: Build OK`);
        resolve(true);
      } else {
        console.log(`❌ ${name}: Build falhou (código: ${code})`);
        resolve(false);
      }
    });

    // Timeout de 30 segundos
    setTimeout(() => {
      child.kill();
      console.log(`⏰ ${name}: Timeout no build`);
      resolve(false);
    }, 30000);
  });
}

async function runTests() {
  const tests = [
    { name: 'Rick & Morty', dir: 'rick-morty-microfrontend', port: 3002 },
    { name: 'Auth', dir: 'auth-microfrontend', port: 3001 },
    { name: 'Shell', dir: 'shell-app', port: 3000 }
  ];

  let allPassed = true;

  for (const test of tests) {
    const result = await testMicrofrontend(test.name, test.dir, test.port);
    if (!result) allPassed = false;
  }

  console.log('\n📋 Resultado dos testes:');
  if (allPassed) {
    console.log('🎉 Todos os microfrontends estão configurados corretamente!');
    console.log('🚀 Você pode executar: npm start');
  } else {
    console.log('⚠️  Alguns microfrontends têm problemas de configuração.');
    console.log('🔧 Verifique os erros acima e corrija antes de executar.');
  }
}

runTests().catch(console.error);