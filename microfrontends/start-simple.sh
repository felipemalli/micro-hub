#!/bin/bash

echo "🚀 Iniciando microfrontends em modo simples..."
echo "============================================="

# Função para verificar se uma porta está em uso
check_port() {
    if command -v lsof >/dev/null 2>&1; then
        if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
            echo "⚠️  Porta $1 já está em uso!"
            return 1
        fi
    fi
    return 0
}

# Verificar portas
echo "🔍 Verificando portas..."
check_port 3000 || { echo "❌ Porta 3000 ocupada. Use: pkill -f 'webpack.*3000' para finalizar."; }
check_port 3001 || { echo "❌ Porta 3001 ocupada. Use: pkill -f 'webpack.*3001' para finalizar."; }
check_port 3002 || { echo "❌ Porta 3002 ocupada. Use: pkill -f 'webpack.*3002' para finalizar."; }

echo ""
echo "📋 Instruções de execução:"
echo ""
echo "1️⃣  PRIMEIRO TERMINAL - Rick & Morty (porta 3002):"
echo "   cd rick-morty-microfrontend && npm start"
echo ""
echo "2️⃣  SEGUNDO TERMINAL - Auth (porta 3001):"
echo "   cd auth-microfrontend && npm start"
echo ""
echo "3️⃣  TERCEIRO TERMINAL - Shell (porta 3000):"
echo "   cd shell-app && npm start"
echo ""
echo "🌐 Depois acesse: http://localhost:3000"
echo ""
echo "💡 Dica: Abra 3 terminais e execute os comandos acima em sequência"
echo "⚠️  IMPORTANTE: Execute na ordem mostrada acima!"
echo ""

# Opção para executar automaticamente em background
read -p "🤔 Deseja tentar executar automaticamente em background? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Iniciando em background..."
    
    # Rick & Morty
    echo "👽 Iniciando Rick & Morty..."
    cd rick-morty-microfrontend
    npm start > ../logs-rickmorty.log 2>&1 &
    RICK_PID=$!
    cd ..
    
    sleep 3
    
    # Auth
    echo "🔐 Iniciando Auth..."
    cd auth-microfrontend
    npm start > ../logs-auth.log 2>&1 &
    AUTH_PID=$!
    cd ..
    
    sleep 3
    
    # Shell
    echo "🏠 Iniciando Shell..."
    cd shell-app
    npm start > ../logs-shell.log 2>&1 &
    SHELL_PID=$!
    cd ..
    
    echo ""
    echo "✅ Todos os serviços foram iniciados em background!"
    echo "📋 PIDs dos processos:"
    echo "   Rick & Morty: $RICK_PID"
    echo "   Auth: $AUTH_PID" 
    echo "   Shell: $SHELL_PID"
    echo ""
    echo "📄 Logs salvos em:"
    echo "   logs-rickmorty.log"
    echo "   logs-auth.log"
    echo "   logs-shell.log"
    echo ""
    echo "🌐 Aguarde ~10 segundos e acesse: http://localhost:3000"
    echo ""
    echo "🛑 Para parar todos os serviços:"
    echo "   kill $RICK_PID $AUTH_PID $SHELL_PID"
    echo "   ou execute: pkill -f webpack"
    
    # Salvar PIDs para facilitar o stop
    echo "$RICK_PID $AUTH_PID $SHELL_PID" > .pids
    echo ""
    echo "💾 PIDs salvos em .pids para facilitar o stop"
    echo "🛑 Para parar: kill \$(cat .pids)"
fi