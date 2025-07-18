#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('🔄 Executando migrações...');

const migrateProcess = spawn('npx', ['typeorm-ts-node-commonjs', 'migration:run', '-d', 'src/data-source.js'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
});

migrateProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Migrações executadas com sucesso!');
  } else {
    console.error('❌ Erro ao executar migrações');
    process.exit(code);
  }
});

migrateProcess.on('error', (error) => {
  console.error('❌ Erro ao executar migrações:', error);
  process.exit(1);
}); 