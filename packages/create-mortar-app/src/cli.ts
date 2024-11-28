#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const appDir = 'src'

program.name('create-mortar-app').description('CLI for generating a mortar app project').version('1.0.0');

const isDirectoryEmpty = (dir: string): boolean => {
    const files = fs.readdirSync(dir);
    return files.length === 0;
};

const setupProjectStructure = (targetDir: string): void => {
    const filesDir = path.join(__dirname, '../files');
    if (!fs.existsSync(filesDir)) {
        console.error(`Source directory '${filesDir}' does not exist.`);
        process.exit(1);
    }
    const files = fs.readdirSync(filesDir);
    if (files.length === 0) {
        console.error(`No files found in '${filesDir}'.`);
        process.exit(1);
    }
    files.forEach((file) => {
        const srcPath = path.join(filesDir, file);
        const destPath = path.join(targetDir, file);
        fs.copyFileSync(srcPath, destPath);
    });

    const srcDir = path.join(targetDir, appDir);
    const dirs = ['pages', 'components', 'theme', 'assets'];
    if (!fs.existsSync(srcDir)) {
        fs.mkdirSync(srcDir);
    }
    dirs.forEach((dir) => {
        const dirPath = path.join(srcDir, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    });
};


const updatePackageJson = (targetDir: string, appName: string): void => {
    const packageJsonPath = path.join(targetDir, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
        console.error(`package.json not found at '${packageJsonPath}'`);
        process.exit(1);
    }
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.name = appName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

const updateMortarConfig = (targetDir: string, appName: string): void => {
    const mortarConfigPath = path.join(targetDir, 'mortar-config.json');
    if (!fs.existsSync(mortarConfigPath)) {
        console.error(`mortar-config.json not found at '${mortarConfigPath}'`);
        process.exit(1);
    }
    const mortarConfig = JSON.parse(fs.readFileSync(mortarConfigPath, 'utf-8'));
    mortarConfig.name = appName;
    fs.writeFileSync(mortarConfigPath, JSON.stringify(mortarConfig, null, 2));
};

const installDependencies = (): void => {
    execSync('npm install', { stdio: 'inherit' });
};

const finalize = (targetDir: string): void => {
    const indexPath = path.join(targetDir, appDir, 'index.js');
    const indexContent = `console.log('Welcome to your new Mortar app!');`;

    fs.writeFileSync(indexPath, indexContent);

    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "initialized mortar studio app"', { stdio: 'inherit' });
};

program.argument('[app_name]', 'Name of the app').action((app_name) => {
    const currentDir = process.cwd();
    let targetDir = currentDir;
    if (app_name === '.') {
        if (!isDirectoryEmpty(currentDir)) {
            console.error('Current directory is not empty. Please make sure the directory is empty before proceeding.');
            process.exit(1);
        }
    } else if (app_name) {
        targetDir = path.join(currentDir, app_name);
        if (fs.existsSync(targetDir)) {
            console.error(`Directory "${app_name}" already exists.`);
            process.exit(1);
        }
        fs.mkdirSync(targetDir);
    }
    process.chdir(targetDir);

    setupProjectStructure(targetDir);
    updatePackageJson(targetDir, app_name);
    updateMortarConfig(targetDir, app_name);
    installDependencies();
    if (execSync('git --version', { stdio: 'pipe' })) {
        execSync('git init', { stdio: 'inherit' });
    }
    finalize(targetDir);
});

program.parse(process.argv);
