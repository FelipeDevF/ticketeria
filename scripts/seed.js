#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🌱 Executando seeds...');

const seedProcess = spawn('npx', ['ts-node', 'src/database/seeds/run-seeds.ts'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
});

seedProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Seeds executados com sucesso!');
  } else {
    console.error('❌ Erro ao executar seeds');
    process.exit(code);
  }
});

seedProcess.on('error', (error) => {
  console.error('❌ Erro ao executar seeds:', error);
  process.exit(1);
}); 