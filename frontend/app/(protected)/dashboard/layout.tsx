
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await currentUser();

  // const isAdmin = user?.publicMetadata?.role === "admin";
  // if (!isAdmin) {
  //   redirect("/");
  // }

  return (
    
        <div className=" p-4">{children}</div>
     
  );
}
