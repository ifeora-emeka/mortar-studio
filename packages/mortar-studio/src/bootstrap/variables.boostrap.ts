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
            lightValue: '#f0fdf4',
            darkValue: '#f0fdf4',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-2',
            index: 1,
            slug: 'primary-color-2',
            name: '100',
            type: 'color',
            lightValue: '#dcfce7',
            darkValue: '#dcfce7',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-3',
            index: 2,
            slug: 'primary-color-3',
            name: '200',
            type: 'color',
            lightValue: '#bbf7d0',
            darkValue: '#bbf7d0',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-4',
            index: 3,
            slug: 'primary-color-4',
            name: '300',
            type: 'color',
            lightValue: '#86efac',
            darkValue: '#86efac',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-5',
            index: 4,
            slug: 'primary-color-5',
            name: '400',
            type: 'color',
            lightValue: '#4ade80',
            darkValue: '#4ade80',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-6',
            index: 5,
            slug: 'primary-color-6',
            name: '500',
            type: 'color',
            lightValue: '#22c55e',
            darkValue: '#22c55e',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-7',
            index: 6,
            slug: 'primary-color-7',
            name: '600',
            type: 'color',
            lightValue: '#16a34a',
            darkValue: '#16a34a',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-8',
            index: 7,
            slug: 'primary-color-8',
            name: '700',
            type: 'color',
            lightValue: '#15803d',
            darkValue: '#15803d',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-9',
            index: 8,
            slug: 'primary-color-9',
            name: '800',
            type: 'color',
            lightValue: '#166534',
            darkValue: '#166534',
            setID: 'primary-color',
            isStatic: true
        },
        {
            id: 'primary-color-10',
            index: 9,
            slug: 'primary-color-10',
            name: '900',
            type: 'color',
            lightValue: '#14532d',
            darkValue: '#14532d',
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
            lightValue: '#f7fee7',
            darkValue: '#f7fee7',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-2',
            index: 1,
            slug: 'secondary-color-2',
            name: '100',
            type: 'color',
            lightValue: '#ecfccb',
            darkValue: '#ecfccb',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-3',
            index: 2,
            slug: 'secondary-color-3',
            name: '200',
            type: 'color',
            lightValue: '#d9f99d',
            darkValue: '#d9f99d',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-4',
            index: 3,
            slug: 'secondary-color-4',
            name: '300',
            type: 'color',
            lightValue: '#bef264',
            darkValue: '#bef264',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-5',
            index: 4,
            slug: 'secondary-color-5',
            name: '400',
            type: 'color',
            lightValue: '#a3e635',
            darkValue: '#a3e635',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-6',
            index: 5,
            slug: 'secondary-color-6',
            name: '500',
            type: 'color',
            lightValue: '#84cc16',
            darkValue: '#84cc16',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-7',
            index: 6,
            slug: 'secondary-color-7',
            name: '600',
            type: 'color',
            lightValue: '#65a30d',
            darkValue: '#65a30d',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-8',
            index: 7,
            slug: 'secondary-color-8',
            name: '700',
            type: 'color',
            lightValue: '#4d7c0f',
            darkValue: '#4d7c0f',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-9',
            index: 8,
            slug: 'secondary-color-9',
            name: '800',
            type: 'color',
            lightValue: '#3f6212',
            darkValue: '#3f6212',
            setID: 'secondary-color',
            isStatic: true
        },
        {
            id: 'secondary-color-10',
            index: 9,
            slug: 'secondary-color-10',
            name: '900',
            type: 'color',
            lightValue: '#365314',
            darkValue: '#365314',
            setID: 'secondary-color',
            isStatic: true
        },
        // sizes
        {
            id: 'spacing-small',
            index: 0,
            slug: 'spacing-small',
            name: 'small',
            type: 'measurement',
            lightValue: '0.25rem', // sm
            darkValue: '0.25rem',
            setID: 'sizes',
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
            setID: 'sizes',
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
            setID: 'sizes',
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
            setID: 'sizes',
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
            setID: 'sizes',
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
            setID: 'sizes',
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
            setID: 'sizes',
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
            setID: 'sizes',
            isStatic: true
        },
        // Semantic colors
        {
            id: 'semantic-color-error',
            index: 0,
            slug: 'semantic-color-error',
            name: 'error',
            type: 'color',
            lightValue: '#f44336',
            darkValue: '#f44336',
            setID: 'semantic-color',
            isStatic: true
        },
        {
            id: 'semantic-color-warning',
            index: 1,
            slug: 'semantic-color-warning',
            name: 'warning',
            type: 'color',
            lightValue: '#ff9800',
            darkValue: '#ff9800',
            setID: 'semantic-color',
            isStatic: true
        },
        {
            id: 'semantic-color-success',
            index: 2,
            slug: 'semantic-color-success',
            name: 'success',
            type: 'color',
            lightValue: '#4caf50',
            darkValue: '#4caf50',
            setID: 'semantic-color',
            isStatic: true
        },
        {
            id: 'semantic-color-info',
            index: 3,
            slug: 'semantic-color-info',
            name: 'info',
            type: 'color',
            lightValue: '#2196f3',
            darkValue: '#2196f3',
            setID: 'semantic-color',
            isStatic: true
        },
        {
            id: 'semantic-color-background',
            index: 4,
            slug: 'semantic-color-background',
            name: 'background',
            type: 'color',
            lightValue: '#F3F6EA',
            darkValue: '#F3F6EA',
            setID: 'semantic-color',
            isStatic: true
        },
        {
            id: 'semantic-color-muted',
            index: 5,
            slug: 'semantic-color-muted',
            name: 'muted',
            type: 'color',
            lightValue: '#8B9793',
            darkValue: '#8B9793',
            setID: 'semantic-color',
            isStatic: true
        },
        // Accent colors
        {
            id: 'accent-color-1',
            index: 0,
            slug: 'accent-color-1',
            name: '50',
            type: 'color',
            lightValue: '#f3e8ff',
            darkValue: '#f3e8ff',
            setID: 'accent-color',
            isStatic: true
        },
        {
            id: 'accent-color-2',
            index: 1,
            slug: 'accent-color-2',
            name: '100',
            type: 'color',
            lightValue: '#e9d5ff',
            darkValue: '#e9d5ff',
            setID: 'accent-color',
            isStatic: true
        },
        {
            id: 'accent-color-3',
            index: 2,
            slug: 'accent-color-3',
            name: '200',
            type: 'color',
            lightValue: '#d8b4fe',
            darkValue: '#d8b4fe',
            setID: 'accent-color',
            isStatic: true
        },
        {
            id: 'accent-color-4',
            index: 3,
            slug: 'accent-color-4',
            name: '300',
            type: 'color',
            lightValue: '#c084fc',
            darkValue: '#c084fc',
            setID: 'accent-color',
            isStatic: true
        },
        {
            id: 'accent-color-5',
            index: 4,
            slug: 'accent-color-5',
            name: '400',
            type: 'color',
            lightValue: '#a855f7',
            darkValue: '#a855f7',
            setID: 'accent-color',
            isStatic: true
        },
        {
            id: 'accent-color-6',
            index: 5,
            slug: 'accent-color-6',
            name: '500',
            type: 'color',
            lightValue: '#9333ea',
            darkValue: '#9333ea',
            setID: 'accent-color',
            isStatic: true
        },
        {
            id: 'accent-color-7',
            index: 6,
            slug: 'accent-color-7',
            name: '600',
            type: 'color',
            lightValue: '#7e22ce',
            darkValue: '#7e22ce',
            setID: 'accent-color',
            isStatic: true
        },
        {
            id: 'accent-color-8',
            index: 7,
            slug: 'accent-color-8',
            name: '700',
            type: 'color',
            lightValue: '#6b21a8',
            darkValue: '#6b21a8',
            setID: 'accent-color',
            isStatic: true
        },
        {
            id: 'accent-color-9',
            index: 8,
            slug: 'accent-color-9',
            name: '800',
            type: 'color',
            lightValue: '#581c87',
            darkValue: '#581c87',
            setID: 'accent-color',
            isStatic: true
        },
        {
            id: 'accent-color-10',
            index: 9,
            slug: 'accent-color-10',
            name: '900',
            type: 'color',
            lightValue: '#3b0764',
            darkValue: '#3b0764',
            setID: 'accent-color',
            isStatic: true
        }
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
            id: 'sizes',
            name: 'sizes',
            slug: 'sizes',
            index: 2,
            isStatic: true
        },
        {
            id: 'semantic-color',
            name: 'semantic colors',
            slug: 'semantic-color',
            index: 3,
            isStatic: true
        },
        {
            id: 'accent-color',
            name: 'accent colors',
            slug: 'accent-color',
            index: 4,
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

