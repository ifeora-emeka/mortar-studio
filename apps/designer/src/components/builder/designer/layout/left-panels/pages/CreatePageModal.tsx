import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {usePreviewContext} from "@/components/builder/context/preview.context.tsx";
import slugify from "slugify";

const formSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
    route: z.string().min(1, 'Route is required').max(50, 'Route must be 50 characters or less').regex(/^\/[a-z0-9\-/]*$/, 'Route must start with / and can only contain lowercase letters, numbers, hyphens, and forward slashes'),
    description: z.string().max(200, 'Description must be 200 characters or less').optional(),
})

export default function CreatePageModal({open, setOpen}: {open:boolean, setOpen: (open: boolean) => void}) {
    const { pushToArray } = usePreviewContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            route: '/',
            description: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const slug = slugify(values.name, { lower: true, strict: true })
        pushToArray('pages', {
            id: slug,
            title: values.name,
            slug: slug,
            description: values.description,
            route: values.route.trim(),
        });
        setOpen(false);
        form.reset();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] bg-card">
                <DialogHeader>
                    <DialogTitle>Create New Page</DialogTitle>
                    <DialogDescription>
                        Add a new page to your website. Fill out the details below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Home" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The name of your page as it will appear in the navigation.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="route"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Route</FormLabel>
                                    <FormControl>
                                        <Input placeholder="/home" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The URL path for this page.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="A brief description of the page content."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        A short description of the page content (max 200 characters).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Create Page</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

