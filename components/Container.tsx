function BodyContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1100px] mx-auto bg-background min-h-screen  flex-col my-[60px] p-6 items-center justify-center ">
      {children}
    </div>
  );
}

export default BodyContainer;
