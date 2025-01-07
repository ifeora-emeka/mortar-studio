import {CreateComponentSchema, MortarComponent} from "./components.schema.js";
import {MortarElementInstance} from "./instance.schema.js";
import {
    CreateVariableSchema,
    CreateVariableSetSchema,
    MortarVariable,
    MortarVariableSet
} from "./variables.schema.js";
import {MortarStyle} from "./styles.schema.js";
import {CreateMortarPageSchema, MortarPage} from "./page.schema.js";
import { z } from 'zod';
import {GoogleFont} from "./config.schema.js";
import {MortarFile} from "./files.schema.js";

export const APISyncDataSchema = z.object({
    components: z.array(CreateComponentSchema),
    // instances: z.array(CreateMortarInstanceSchema),
    variableSets: z.array(CreateVariableSetSchema),
    variables: z.array(CreateVariableSchema),
    // styles: z.array(CreateMortarStyleSchema),
    pages: z.array(CreateMortarPageSchema),
});

export interface APISyncData {
    components: MortarComponent[];
    instances: MortarElementInstance[];
    variableSets: MortarVariableSet[];
    variables: MortarVariable[];
    styles: MortarStyle[];
    pages: MortarPage[];
    fonts: GoogleFont[];
    files: MortarFile[];
}