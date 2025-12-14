import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfoForm from "./ProfileInfoForm";
import ChangePasswordForm from "./ChangePasswordForm";
import DeleteAccountForm from "./DeleteAccountForm";
import { User } from "@/types/user";

export default function ProfileEditTabs({ user }: { user: User }) {
  return (
    <Tabs defaultValue="profile" className="mt-10">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="delete">Delete</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileInfoForm user={user} />
      </TabsContent>

      <TabsContent value="password">
        <ChangePasswordForm />
      </TabsContent>

      <TabsContent value="delete">
        <DeleteAccountForm />
      </TabsContent>
    </Tabs>
  );
}
