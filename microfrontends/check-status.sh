#!/bin/bash

echo "🔍 Verificando status dos microfrontends..."
echo "==========================================="

# Função para verificar serviço
check_service() {
    local port=$1
    local name=$2
    
    if curl -s http://localhost:$port > /dev/null 2>&1; then
        echo "✅ $name (porta $port): OK"
        return 0
    else
        echo "❌ $name (porta $port): Não está rodando"
        return 1
    fi
}

# Verificar cada serviço
check_service 3002 "Rick & Morty"
check_service 3001 "Auth"
check_service 3000 "Shell"

echo ""
echo "📋 Processos webpack ativos:"
pgrep -f webpack | wc -l | xargs echo "Processos webpack:"

echo ""
echo "🌐 URLs para teste:"
echo "   Shell: http://localhost:3000"
echo "   Auth: http://localhost:3001" 
echo "   Rick & Morty: http://localhost:3002"