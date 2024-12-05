import fs from 'fs';
import path from 'path';
import {MortarVariable, MortarVariableSet} from '@repo/common/schema/variables'

export const createStaticVariables = () => {
    const variables: MortarVariable[] = [
        // primary colors
        {
            id: 'primary-color-1',
            index: 0,
            slug: 'primary-color-1',
            name: '50',
            type: 'color',
            lightValue: '#f0f4fa',
            darkValue: '#f0f4fa',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-2',
            index: 1,
            slug: 'primary-color-2',
            name: '100',
            type: 'color',
            lightValue: '#d9e2ec',
            darkValue: '#d9e2ec',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-3',
            index: 2,
            slug: 'primary-color-3',
            name: '200',
            type: 'color',
            lightValue: '#b7c6d2',
            darkValue: '#b7c6d2',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-4',
            index: 3,
            slug: 'primary-color-4',
            name: '300',
            type: 'color',
            lightValue: '#8da9be',
            darkValue: '#8da9be',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-5',
            index: 4,
            slug: 'primary-color-5',
            name: '400',
            type: 'color',
            lightValue: '#6b8eae',
            darkValue: '#6b8eae',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-6',
            index: 5,
            slug: 'primary-color-6',
            name: '500',
            type: 'color',
            lightValue: '#4a708b',
            darkValue: '#4a708b',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-7',
            index: 6,
            slug: 'primary-color-7',
            name: '600',
            type: 'color',
            lightValue: '#2a5674',
            darkValue: '#2a5674',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-8',
            index: 7,
            slug: 'primary-color-8',
            name: '700',
            type: 'color',
            lightValue: '#1e3a56',
            darkValue: '#1e3a56',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-9',
            index: 8,
            slug: 'primary-color-9',
            name: '800',
            type: 'color',
            lightValue: '#12263f',
            darkValue: '#12263f',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-10',
            index: 9,
            slug: 'primary-color-10',
            name: '900',
            type: 'color',
            lightValue: '#09172a',
            darkValue: '#09172a',
            setID: 'primary-color',
            isStatic: true
        },
        // secondary colors
        {
            id: 'secondary-color-1',
            index: 0,
            slug: 'secondary-color-1',
            name: '50',
            type: 'color',
            lightValue: '#f3edea',
            darkValue: '#f3edea',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-2',
            index: 1,
            slug: 'secondary-color-2',
            name: '100',
            type: 'color',
            lightValue: '#e1d3cd',
            darkValue: '#e1d3cd',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-3',
            index: 2,
            slug: 'secondary-color-3',
            name: '200',
            type: 'color',
            lightValue: '#d0b9b0',
            darkValue: '#d0b9b0',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-4',
            index: 3,
            slug: 'secondary-color-4',
            name: '300',
            type: 'color',
            lightValue: '#c09f93',
            darkValue: '#c09f93',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-5',
            index: 4,
            slug: 'secondary-color-5',
            name: '400',
            type: 'color',
            lightValue: '#af8576',
            darkValue: '#af8576',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-6',
            index: 5,
            slug: 'secondary-color-6',
            name: '500',
            type: 'color',
            lightValue: '#9e6b59',
            darkValue: '#9e6b59',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-7',
            index: 6,
            slug: 'secondary-color-7',
            name: '600',
            type: 'color',
            lightValue: '#8e513c',
            darkValue: '#8e513c',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-8',
            index: 7,
            slug: 'secondary-color-8',
            name: '700',
            type: 'color',
            lightValue: '#7d3720',
            darkValue: '#7d3720',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-9',
            index: 8,
            slug: 'secondary-color-9',
            name: '800',
            type: 'color',
            lightValue: '#6d1d03',
            darkValue: '#6d1d03',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-10',
            index: 9,
            slug: 'secondary-color-10',
            name: '900',
            type: 'color',
            lightValue: '#5c0000',
            darkValue: '#5c0000',
            setID: 'secondary-color',
            isStatic: true
        },
        // spacing
        {
            id: 'spacing-small',
            index: 0,
            slug: 'spacing-small',
            name: 'small',
            type: 'measurement',
            lightValue: '0.25rem', // sm
            darkValue: '0.25rem',
            setID: 'spacing',
            isStatic: true
        },
        {
            id: 'spacing-medium',
            index: 1,
            slug: 'spacing-medium',
            name: 'medium',
            type: 'measurement',
            lightValue: '0.5rem', // md
            darkValue: '0.5rem',
            setID: 'spacing',
            isStatic: true
        },
        {
            id: 'spacing-large',
            index: 2,
            slug: 'spacing-large',
            name: 'large',
            type: 'measurement',
            lightValue: '1rem', // lg
            darkValue: '1rem',
            setID: 'spacing',
            isStatic: true
        },
        {
            id: 'spacing-xlarge',
            index: 3,
            slug: 'spacing-xlarge',
            name: 'xlarge',
            type: 'measurement',
            lightValue: '1.5rem', // xl
            darkValue: '1.5rem',
            setID: 'spacing',
            isStatic: true
        },
        {
            id: 'spacing-2xlarge',
            index: 4,
            slug: 'spacing-2xlarge',
            name: '2xlarge',
            type: 'measurement',
            lightValue: '2rem', // 2xl
            darkValue: '2rem',
            setID: 'spacing',
            isStatic: true
        },
        {
            id: 'spacing-3xlarge',
            index: 5,
            slug: 'spacing-3xlarge',
            name: '3xlarge',
            type: 'measurement',
            lightValue: '3rem', // 3xl
            darkValue: '3rem',
            setID: 'spacing',
            isStatic: true
        },
        {
            id: 'spacing-4xlarge',
            index: 6,
            slug: 'spacing-4xlarge',
            name: '4xlarge',
            type: 'measurement',
            lightValue: '4rem', // 4xl
            darkValue: '4rem',
            setID: 'spacing',
            isStatic: true
        },
        {
            id: 'spacing-5xlarge',
            index: 7,
            slug: 'spacing-5xlarge',
            name: '5xlarge',
            type: 'measurement',
            lightValue: '5rem', // 5xl
            darkValue: '5rem',
            setID: 'spacing',
            isStatic: true
        },
    ];

    const variableSets: MortarVariableSet[] = [
        {
            id: 'primary-color',
            name: 'primary colors',
            slug: 'primary-color',
            index: 0,
            isStatic: true
        },
        {
            id: 'secondary-color',
            name: 'secondary colors',
            slug: 'secondary-color',
            index: 1,
            isStatic: true
        },
        {
            id: 'spacing',
            name: 'spacing',
            slug: 'spacing',
            index: 2,
            isStatic: true
        }
    ];

    const variablesDir = path.join(process.env.MORTAR_ROOT_DIRECTORY as string, 'variables');
    const variablesFile = path.join(variablesDir, 'variables.json');
    const variableSetsFile = path.join(variablesDir, 'sets.json');

    if (!fs.existsSync(variablesDir)) {
        fs.mkdirSync(variablesDir, {recursive: true});
    }

    if (!fs.existsSync(variablesFile)) {
        fs.writeFileSync(variablesFile, JSON.stringify(variables, null, 2));
    }

    if (!fs.existsSync(variableSetsFile)) {
        fs.writeFileSync(variableSetsFile, JSON.stringify(variableSets, null, 2));
    }
};

