export default function SearchBox() {
    return (
        <form>
            <button className="absolute" type="submit">
                <i className="absolute translate-y-1 left-1 bi bi-search"></i>
            </button>
            <input
                className="pl-7 border-solid rounded-md border border-gray-500 w-[15rem] h-8"
                type="text"
                placeholder="Search"
            ></input>
        </form>
    );
}
