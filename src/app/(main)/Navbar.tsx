import SearchField from "@/components/SearchField"
import UserButton from "@/components/UserButton"
import Link from "next/link"

const Navbar = () => {
  return (
    <header className="sticky top-0 shadow-sm bg-card z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-5 px-5 py-3">
            <Link href="/" className="text-2xl font-bold text-primary">
                bugbook
            </Link>
            <SearchField/>
            <UserButton className="sm:ms-auto"/>
        </div>
    </header>
  )
}

export default Navbar