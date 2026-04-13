const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[70vh] space-y-4">
       
            <span className="loading loading-spinner text-primary w-24"></span>
       
            <p className="text-2xl font-semibold text-primary animate-pulse">
                Loading Data...
            </p>
        </div>
    );
};

export default Loading;