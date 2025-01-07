import SingleBlog from "../SingleBlog";

function Blogs() {
    return ( <div className="w-full mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Blogs</h1>
        <div className="flex flex-col items-center justify-center">
        <SingleBlog />
        </div>
    </div> );
}

export default Blogs;