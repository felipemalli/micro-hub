#!/bin/bash

# Script para iniciar todos os microfrontends em paralelo
# Ordem:  auth -> rickmorty -> shell

echo "🚀 Iniciando todos os microfrontends..."

# Função para verificar se uma porta está ocupada
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Porta $1 já está em uso"
        return 1
    else
        return 0
    fi
}

# Verificar portas
echo "🔍 Verificando portas..."
check_port 3000 || exit 1
check_port 3001 || exit 1
check_port 3002 || exit 1
check_port 3003 || exit 1

# Criar logs directory se não existir
mkdir -p logs

# Iniciar auth-microfrontend (porta 3001)
echo "🔐 Iniciando auth-microfrontend na porta 3001..."
cd auth-microfrontend
npm start > ../logs/auth.log 2>&1 &
AUTH_PID=$!
cd ..

# Iniciar rick-morty-microfrontend (porta 3002)
echo "👽 Iniciando rick-morty-microfrontend na porta 3002..."
cd rick-morty-microfrontend
npm start > ../logs/rickmorty.log 2>&1 &
RICKMORTY_PID=$!
cd ..

# Aguardar microfrontends inicializarem
echo "⏳ Aguardando microfrontends inicializarem..."
sleep 8

# Iniciar shell-app (porta 3000)
echo "🏠 Iniciando shell-app na porta 3000..."
cd shell-app
npm start > ../logs/shell.log 2>&1 &
SHELL_PID=$!
cd ..

# Salvar PIDs para poder parar depois
echo "$SHARED_PID" > logs/shared.pid
echo "$AUTH_PID" > logs/auth.pid
echo "$RICKMORTY_PID" > logs/rickmorty.pid
echo "$SHELL_PID" > logs/shell.pid

echo ""
echo "✅ Todos os microfrontends foram iniciados!"
echo ""
echo "📋 Status dos serviços:"
echo "   📦 Shared Components: http://localhost:3003 (PID: $SHARED_PID)"
echo "   🔐 Auth Microfrontend: http://localhost:3001 (PID: $AUTH_PID)"
echo "   👽 Rick & Morty: http://localhost:3002 (PID: $RICKMORTY_PID)"
echo "   🏠 Shell App: http://localhost:3000 (PID: $SHELL_PID)"
echo ""
echo "🌐 Acesse a aplicação em: http://localhost:3000"
echo ""
echo "📝 Logs disponíveis em:"
echo "   - logs/auth.log"
echo "   - logs/rickmorty.log"
echo "   - logs/shell.log"
echo ""
echo "⏹️  Para parar todos os serviços, execute: npm run stop"

# Aguardar todos os processos
wait