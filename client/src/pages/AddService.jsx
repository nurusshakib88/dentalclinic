import { useState } from "react"; // Import useState hook
import { useService } from "../context/ServiceContext";

const AddService = () => {
  const {
    title,
    setTitle,
    desc,
    setDesc,
    imageUrl,
    services,
    Submit,
    handleDelete,
    handleImageChange,
    image,
    loading,
  } = useService();

  // State for the search keyword
  const [searchKeyword, setSearchKeyword] = useState("");

  // Filter services based on the search keyword
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="p-4 pt-10 pb-20 pe-20">
      <h1 className="text-2xl font-semibold mb-2">Add Services</h1>
      <form onSubmit={Submit} className="mb-4">
        <input
          type="text"
          placeholder="Service Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 rounded border border-gray-300"
        />
        <textarea
          type="text"
          placeholder="Service Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full mb-2 p-2 rounded border border-gray-300"
        />
        {/* Image */}
        <div className="flex items-center gap-10 justify-between">
          {" "}
          <label
            htmlFor="file-upload"
            className="cursor-pointer mb-2 inline-block"
          >
            {image ? (
              <img
                className="w-20 aspect-square rounded-full"
                src={image ? URL.createObjectURL(image) : ""}
                alt="Selected Image"
              />
            ) : (
              <div className="w-20 h-20 btn btn-circle">Select Image</div>
            )}
          </label>
          <input
            id="file-upload"
            className="hidden"
            type="file"
            onChange={handleImageChange}
          />
          <button
            type="submit"
            className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Add Service"}
          </button>
        </div>
      </form>

      <div className="mb-4">
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search Services"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        />
      </div>

      <h1 className="text-2xl font-semibold mb-2">All Services</h1>
      <div className="grid grid-cols-5 gap-5">
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="bg-white p-5 rounded-md overflow-hidden"
          >
            <img
              src={service.imageUrl}
              className="w-full h-[100px] object-cover"
              alt={service.title}
            />
            <h3 className="text-accent text-[22px] font-semibold">
              {service.title}
            </h3>
            <p>{service.desc}</p>
            <p className="truncate">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
              exercitationem eveniet libero illo mollitia nulla quas, non
              adipisci itaque unde commodi harum sequi iusto! Ex eius voluptatem
              nostrum asperiores cumque.
            </p>
            <button
              type="button"
              onClick={() => handleDelete(service._id)}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddService;
