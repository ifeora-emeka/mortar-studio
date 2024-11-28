#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { MortarConfig } from '@repo/common/types/config.types';

const program = new Command();

program
    .name('create-mortar-app')
    .description('CLI for generating a mortar app project')
    .version('1.0.0');

const isDirectoryEmpty = (dir: string): boolean => {
    const files = fs.readdirSync(dir);
    return files.length === 0;
};

const createProjectDirectories = (rootDir: string): void => {
    const srcDir = path.join(rootDir, 'src');
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

const createMortarConfigFile = (dir: string, mortarConfig: MortarConfig): void => {
    const configPath = path.join(dir, 'mortar-studio-config.json');
    fs.writeFileSync(configPath, JSON.stringify(mortarConfig, null, 2));
};

const createGitignore = (dir: string): void => {
    const gitignorePath = path.join(dir, '.gitignore');
    const gitignoreContent = `
node_modules/
.env
    `;
    fs.writeFileSync(gitignorePath, gitignoreContent.trim());
};

program
    .argument('[app_name]', 'Name of the app')
    .action((app_name) => {
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

        execSync('npm init -y', { stdio: 'inherit' });

        createProjectDirectories(targetDir);

        const mortarConfig: MortarConfig = {
            name: app_name || 'mortar-studio-app',
            version: '1.0.0',
            description: '',
            rootDir: targetDir
        };

        createMortarConfigFile(targetDir, mortarConfig);

        createGitignore(targetDir);

        if (execSync('git --version', { stdio: 'pipe' })) {
            execSync('git init', { stdio: 'inherit' });
        }
    });

program.parse(process.argv);
