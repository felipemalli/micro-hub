#!/bin/bash

echo "🛑 Parando todos os microfrontends..."
echo "===================================="

# Função para parar processos por porta
stop_by_port() {
    local port=$1
    local name=$2
    
    if command -v lsof >/dev/null 2>&1; then
        local pid=$(lsof -ti:$port)
        if [ ! -z "$pid" ]; then
            echo "🔴 Parando $name (porta $port, PID: $pid)..."
            kill -TERM $pid 2>/dev/null
            sleep 2
            # Se ainda estiver rodando, force kill
            if kill -0 $pid 2>/dev/null; then
                echo "⚡ Forçando parada de $name..."
                kill -KILL $pid 2>/dev/null
            fi
            echo "✅ $name parado"
        else
            echo "ℹ️  $name não estava rodando (porta $port)"
        fi
    else
        echo "⚠️  lsof não disponível, tentando pkill..."
        pkill -f "webpack.*$port" 2>/dev/null && echo "✅ Processo na porta $port parado" || echo "ℹ️  Nenhum processo encontrado na porta $port"
    fi
}

# Parar por PIDs salvos (se existir)
if [ -f ".pids" ]; then
    echo "📄 Encontrado arquivo .pids, parando processos salvos..."
    PIDS=$(cat .pids)
    for pid in $PIDS; do
        if kill -0 $pid 2>/dev/null; then
            echo "🔴 Parando processo PID: $pid"
            kill -TERM $pid 2>/dev/null
        fi
    done
    rm .pids
    echo "🗑️  Arquivo .pids removido"
    sleep 2
fi

# Parar por portas específicas
stop_by_port 3000 "Shell App"
stop_by_port 3001 "Auth Microfrontend" 
stop_by_port 3002 "Rick & Morty Microfrontend"

# Limpar processos webpack restantes
echo ""
echo "🧹 Limpando processos webpack restantes..."
pkill -f "webpack" 2>/dev/null && echo "✅ Processos webpack limpos" || echo "ℹ️  Nenhum processo webpack encontrado"

# Limpar logs
if ls logs-*.log 1> /dev/null 2>&1; then
    echo "🗑️  Removendo logs antigos..."
    rm logs-*.log
    echo "✅ Logs removidos"
fi

echo ""
echo "🎉 Todos os microfrontends foram parados!"
echo "🔍 Verificando portas..."

# Verificar se as portas estão livres
for port in 3000 3001 3002; do
    if command -v lsof >/dev/null 2>&1; then
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
            echo "⚠️  Porta $port ainda está em uso"
        else
            echo "✅ Porta $port está livre"
        fi
    fi
done

echo ""
echo "👋 Limpeza concluída!"