import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Importing your card components
import { Button } from "@/components/ui/button";

const BlogPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const locale = (await params).locale;
  return (
    <>
      <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">
        Blog
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Example of rendering blog posts */}
        <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-gray-900">
              Post Title 1
            </CardTitle>
            <CardDescription className="text-gray-600">
              A brief description of the blog post.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              This is a short excerpt of the blog post. It gives a brief
              overview of the content.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Read More</Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-gray-900">
              Post Title 2
            </CardTitle>
            <CardDescription className="text-gray-600">
              A brief description of the blog post.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              This is a short excerpt of the blog post. It gives a brief
              overview of the content.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Read More</Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-gray-900">
              Post Title 3
            </CardTitle>
            <CardDescription className="text-gray-600">
              A brief description of the blog post.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              This is a short excerpt of the blog post. It gives a brief
              overview of the content.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Read More</Button>
          </CardFooter>
        </Card>
        {/* Add more Card components for additional blog posts */}
      </div>
    </>
  );
};

export default BlogPage;
