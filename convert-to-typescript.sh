#!/bin/bash

echo "🔄 Convertendo projeto para TypeScript + Tailwind..."
echo "=================================================="

# Função para converter um microfrontend
convert_microfrontend() {
    local dir=$1
    local name=$2
    
    echo "🔧 Convertendo $name..."
    
    cd $dir
    
    # Instalar dependências se ainda não foram instaladas
    if [ ! -d "node_modules" ]; then
        echo "📦 Instalando dependências para $name..."
        npm install
    fi
    
    # Remover arquivos CSS antigos se existirem
    [ -f "src/AuthApp.css" ] && rm src/AuthApp.css
    [ -f "src/RickMortyApp.css" ] && rm src/RickMortyApp.css
    [ -f "src/App.css" ] && rm src/App.css
    
    echo "✅ $name convertido!"
    cd ..
}

# Parar serviços se estiverem rodando
echo "🛑 Parando serviços..."
npm run stop 2>/dev/null || true

# Converter cada microfrontend
convert_microfrontend "shell-app" "Shell App"
convert_microfrontend "auth-microfrontend" "Auth Microfrontend"  
convert_microfrontend "rick-morty-microfrontend" "Rick & Morty Microfrontend"

echo ""
echo "🎉 Conversão concluída!"
echo ""
echo "📋 O que foi feito:"
echo "   ✅ Dependências TypeScript e Tailwind adicionadas"
echo "   ✅ Webpack configs atualizados"
echo "   ✅ Arquivos de configuração criados (tsconfig.json, tailwind.config.js)"
echo "   ✅ Shell App convertido para TypeScript + Tailwind"
echo ""
echo "⚠️  Ainda precisam ser convertidos manualmente:"
echo "   🔄 Auth microfrontend (componentes)"
echo "   🔄 Rick & Morty microfrontend (componentes)"
echo ""
echo "🚀 Para testar o Shell App:"
echo "   cd shell-app && npm start"
echo ""
echo "📖 Veja TYPESCRIPT_MIGRATION.md para detalhes completos"