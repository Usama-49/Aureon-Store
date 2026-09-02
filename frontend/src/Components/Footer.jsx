export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-500 text-center border-t p-6 mt-8  border-gray-800">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Usama Khalid.{" "}
        <span className="text-sm text-orange-400 transition-colors duration-300 hover:text-orange-300">Built with React.js & TailWind CSS.</span>
      </p>
    </footer>
  );
}
