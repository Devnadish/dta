// Update DashboardLayout component
const AnsweredLayout = async ({
  children,
  tags,
}: {
  children: React.ReactNode;
  tags: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col min-h-screen w-full gap-3">
      <div className="flex flex-col md:flex-row  gap-4 w-full justify-end ">
        {tags}
      </div>
      <main className="flex-grow w-full">{children}</main>
    </div>
  );
};

// MustLogin component

export default AnsweredLayout;
