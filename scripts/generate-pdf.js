#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📄 Gerando PDF do resumo da implementação...');

// Verifica se o Pandoc está instalado
const checkPandoc = () => {
  return new Promise((resolve) => {
    const pandocCheck = spawn('pandoc', ['--version'], { stdio: 'ignore' });
    pandocCheck.on('close', (code) => {
      resolve(code === 0);
    });
  });
};

// Gera PDF usando Pandoc
const generatePDFWithPandoc = () => {
  return new Promise((resolve, reject) => {
    const pandocProcess = spawn('pandoc', [
      'IMPLEMENTACAO_CONCLUIDA.md',
      '-o', 'IMPLEMENTACAO_CONCLUIDA.pdf',
      '--pdf-engine=xelatex',
      '--variable=geometry:margin=1in',
      '--variable=fontsize:11pt',
      '--variable=mainfont:DejaVu Sans',
      '--variable=monofont:DejaVu Sans Mono',
      '--toc',
      '--number-sections'
    ], {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd(),
    });

    pandocProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Pandoc failed with code ${code}`));
      }
    });

    pandocProcess.on('error', (error) => {
      reject(error);
    });
  });
};

// Gera PDF usando wkhtmltopdf (alternativa)
const generatePDFWithWkhtmltopdf = () => {
  return new Promise((resolve, reject) => {
    // Primeiro converte markdown para HTML
    const pandocHtml = spawn('pandoc', [
      'IMPLEMENTACAO_CONCLUIDA.md',
      '-o', 'IMPLEMENTACAO_CONCLUIDA.html',
      '--standalone',
      '--css=scripts/pdf-style.css'
    ], {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd(),
    });

    pandocHtml.on('close', (code) => {
      if (code === 0) {
        // Depois converte HTML para PDF
        const wkhtmltopdfProcess = spawn('wkhtmltopdf', [
          '--page-size', 'A4',
          '--margin-top', '20mm',
          '--margin-right', '20mm',
          '--margin-bottom', '20mm',
          '--margin-left', '20mm',
          '--encoding', 'UTF-8',
          'IMPLEMENTACAO_CONCLUIDA.html',
          'IMPLEMENTACAO_CONCLUIDA.pdf'
        ], {
          stdio: 'inherit',
          shell: true,
          cwd: process.cwd(),
        });

        wkhtmltopdfProcess.on('close', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`wkhtmltopdf failed with code ${code}`));
          }
        });

        wkhtmltopdfProcess.on('error', (error) => {
          reject(error);
        });
      } else {
        reject(new Error(`Pandoc HTML conversion failed with code ${code}`));
      }
    });
  });
};

// Função principal
async function generatePDF() {
  try {
    // Verifica se o arquivo markdown existe
    if (!fs.existsSync('IMPLEMENTACAO_CONCLUIDA.md')) {
      console.error('❌ Arquivo IMPLEMENTACAO_CONCLUIDA.md não encontrado!');
      process.exit(1);
    }

    // Verifica se Pandoc está disponível
    const hasPandoc = await checkPandoc();
    
    if (hasPandoc) {
      console.log('✅ Pandoc encontrado, gerando PDF...');
      await generatePDFWithPandoc();
    } else {
      console.log('⚠️ Pandoc não encontrado, tentando wkhtmltopdf...');
      try {
        await generatePDFWithWkhtmltopdf();
      } catch (error) {
        console.error('❌ wkhtmltopdf também não está disponível');
        console.log('\n📋 Alternativas para gerar PDF:');
        console.log('1. Instale Pandoc: https://pandoc.org/installing.html');
        console.log('2. Use um serviço online como:');
        console.log('   - https://www.markdowntopdf.com/');
        console.log('   - https://md-to-pdf.fly.dev/');
        console.log('3. Use o VS Code com extensão "Markdown PDF"');
        console.log('4. Use o arquivo IMPLEMENTACAO_CONCLUIDA.md diretamente');
        process.exit(1);
      }
    }

    // Limpa arquivos temporários
    if (fs.existsSync('IMPLEMENTACAO_CONCLUIDA.html')) {
      fs.unlinkSync('IMPLEMENTACAO_CONCLUIDA.html');
    }

    console.log('✅ PDF gerado com sucesso: IMPLEMENTACAO_CONCLUIDA.pdf');
    
  } catch (error) {
    console.error('❌ Erro ao gerar PDF:', error.message);
    process.exit(1);
  }
}

generatePDF(); 