'use client'

import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import {MortarComponent} from '@repo/common/schema/component';
import {MortarElementInstance} from '@repo/common/schema/instance'
import {MortarElement} from '@repo/common/schema/element'
import {generateRandomID} from '@repo/common/utils'
import {staticFrame} from "@/components/builder/static-elements/frame.static.ts";

const formSchema = z.object({
    componentName: z.string().min(3, {
        message: "Component name is required",
    }).max(50, {
        message: "Component name must be 50 characters or less",
    }).regex(/^[a-zA-Z\s]+$/, {
        message: "Component name must only contain letters",
    }),
    description: z.string().max(200, {
        message: "Description must be 200 characters or less",
    }).optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function AddComponentModal({open, onOpen}: {
    open: boolean,
    onOpen: (e: boolean) => void;
}) {
    const {state: {activePage}, pushToArray} = usePreviewContext()


    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            componentName: "",
            description: "",
        },
    })

    function onSubmit(values: FormValues) {
        //todo: check if component already exists before creating it

        const frameID = generateRandomID(5)
        const frameElement: MortarElement = {
            ...staticFrame(),
            id: frameID,
            attributes: {
                className: "flex flex-col bg-blue-200 p-5"
            },
        }

        const newComponent: MortarComponent = {
            id: generateRandomID(5) + Date.now(),
            name: values.componentName,
            elements: [
                frameElement,
            ],
            props: [],
        }

        if (activePage) {
            setTimeout(() => {
                const newComponentInstance: MortarElementInstance = {
                    id: "instance-" + generateRandomID(10),
                    page_id: activePage.id,
                    children: [],
                    ref: `ref::component::${newComponent.id}`,
                    parentInstance: null,
                    index: 0,
                    incomingProps: [],
                    parentElement: null
                }
                pushToArray('instances', newComponentInstance);
            }, 0)
        }

        pushToArray('components', newComponent);

        onOpen(false)
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogContent className="sm:max-w-[425px] bg-card">
                <DialogHeader>
                    <DialogTitle>Create Component</DialogTitle>
                    <DialogDescription>
                        Enter a name and optional description for your new component. The
                        name should only contain letters.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="componentName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Component Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="MyComponent" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter a brief description of your component"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">
                                Create Component
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

