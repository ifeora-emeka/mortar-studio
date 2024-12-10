"use client"

import {useState} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import * as z from "zod"
import {useComponent} from "@/components/builder/hooks/component.hook.tsx";
import slugify from "slugify";
import {generateRandomID} from '@repo/common/utils'

const customPropSchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.enum(["string", "boolean"]),
    defaultValue: z.string().min(1, "Default value is required"),
})

export type CustomPropFormValues = z.infer<typeof customPropSchema>

export default function AddCustomProps() {
    const [open, setOpen] = useState(false)
    const {addProps} = useComponent();

    const form = useForm<CustomPropFormValues>({
        resolver: zodResolver(customPropSchema),
        defaultValues: {
            name: "",
            type: "string",
            defaultValue: "",
        },
    })

    function onSubmit(data: CustomPropFormValues) {
        addProps({
            id: `${slugify(data.name, {
                strict: true,
                lower: true
            })}-${generateRandomID(5)}`,
            defaultValue: data.defaultValue,
            dataType: data.type,
            label: data.name,
        })
        setOpen(false)
        form.reset()
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline">Add Custom Prop</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-card ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a type"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="string">Text</SelectItem>
                                            <SelectItem value="boolean">True or
                                                False</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="defaultValue"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Default Value</FormLabel>
                                    <FormControl>
                                        {form.watch("type") === "string" ? (
                                            <Textarea {...field} />
                                        ) : (
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value || "false"}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder="Select a default value"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem
                                                        value="false">False</SelectItem>
                                                    <SelectItem
                                                        value="true">True</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Add</Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    )
}

