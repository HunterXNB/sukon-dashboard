"use client";
import React, { FormEvent, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";
import { Permission, PermissionName } from "@/types/Permission";
import { usePermissionsList } from "@/context/PermissionsContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "./ui/checkbox";
const permissionNames: {
  [key in PermissionName]: string;
} = {
  "roles-show": "Show roles",
  "roles-create": "Create a new role",
  "roles-delete": "Delete roles",
  "roles-edit": "Edit roles",
  "roles-list": "List roles",
  "roles-activation-toggle": "Toggle activation status",
  "admin-users-create": "Add new admin user",
  "admin-users-show": "Show admin user",
  "admin-users-delete": "Delete admin user",
  "admin-users-edit": "Edit admin user",
  "admin-users-list": "List admin users",
  "admin-users-activation-toggle": "Toggle admin user activation status",
} as const;
function mapPermissionsNames(permissions: Permission[]) {
  return permissions.map((p) => ({ ...p, name: permissionNames[p.name] }));
}
const formSchema = z.object({
  name: z.string({
    required_error: "Enter name",
  }),
  permissions: z.array(z.number()).refine((value) => value.length > 0, {
    message: "You must select at least one permission",
  }),
});
function CreateRoleForm() {
  const permisions = usePermissionsList();
  const permissionsList = useMemo(
    () => mapPermissionsNames(permisions),
    [permisions]
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <Plus />
          Create Role
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new role</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const formRef = e.currentTarget;
              form.handleSubmit(() => {
                const formData = new FormData(formRef);
              })(e);
            }}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permissions"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Permissions</FormLabel>
                    <FormDescription>
                      Select the permissions you want to give this role.
                    </FormDescription>
                  </div>
                  <div className="flex max-w-full flex-wrap gap-7">
                    {permissionsList.map((permission) => (
                      <FormField
                        key={permission.id}
                        control={form.control}
                        name="permissions"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={permission.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(permission.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          permission.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== permission.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {permission.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRoleForm;
