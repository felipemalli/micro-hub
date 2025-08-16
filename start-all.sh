#!/bin/bash

echo "🚀 Iniciando todos os microfrontends..."
echo "=================================="

# Função para verificar se uma porta está em uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Porta $1 já está em uso!"
        return 1
    else
        return 0
    fi
}

# Verificar portas
echo "🔍 Verificando portas..."
check_port 3000 || { echo "❌ Porta 3000 ocupada. Finalize o processo antes de continuar."; exit 1; }
check_port 3001 || { echo "❌ Porta 3001 ocupada. Finalize o processo antes de continuar."; exit 1; }
check_port 3002 || { echo "❌ Porta 3002 ocupada. Finalize o processo antes de continuar."; exit 1; }

echo "✅ Todas as portas estão disponíveis!"
echo ""

# Iniciar Rick and Morty Microfrontend (porta 3002)
echo "🛸 Iniciando Rick and Morty Microfrontend (porta 3002)..."
cd rick-morty-microfrontend
gnome-terminal --tab --title="Rick&Morty-3002" --command="bash -c 'npm start; read'" &
cd ..

# Aguardar um pouco antes de iniciar o próximo
sleep 2

# Iniciar Auth Microfrontend (porta 3001)
echo "🔐 Iniciando Auth Microfrontend (porta 3001)..."
cd auth-microfrontend
gnome-terminal --tab --title="Auth-3001" --command="bash -c 'npm start; read'" &
cd ..

# Aguardar um pouco antes de iniciar o shell
sleep 3

# Iniciar Shell App (porta 3000)
echo "🏠 Iniciando Shell App (porta 3000)..."
cd shell-app
gnome-terminal --tab --title="Shell-3000" --command="bash -c 'npm start; read'" &
cd ..

echo ""
echo "🎉 Todos os microfrontends foram iniciados!"
echo ""
echo "📋 Status dos serviços:"
echo "   🏠 Shell App:         http://localhost:3000"
echo "   🔐 Auth Micro:        http://localhost:3001"  
echo "   🛸 Rick&Morty Micro:  http://localhost:3002"
echo ""
echo "⏰ Aguarde alguns segundos para todos os serviços iniciarem completamente."
echo "🌐 Acesse: http://localhost:3000"
echo ""
echo "💡 Para parar todos os serviços, feche as abas do terminal ou use Ctrl+C"