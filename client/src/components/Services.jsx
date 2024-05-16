import React from "react";
import { useService } from "../context/ServiceContext";

const Services = () => {
  const { services } = useService();

  return (
    <div className="py-20">
      <div className="px-[350px] text-center">
        <h3 className="text-primary font-semibold">Services</h3>
        <h1 className="text-[36px] font-bold mb-10">
          Experienced in multiple medical practices
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {services.slice(0, 4).map((service) => (
          <div
            key={service._id}
            className="bg-white p-5 rounded-md overflow-hidden"
          >
            <img
              src={service.imageUrl}
              className="w-full h-[200px] object-cover"
              alt={service.title}
            />
            <h3 className="text-accent text-[22px] font-semibold">
              {service.title}
            </h3>
            <p>{service.desc}</p>
            <p className="h-[100px] overflow-clip">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
              exercitationem eveniet libero illo mollitia nulla quas, non
              adipisci itaque unde commodi harum sequi iusto! Ex eius voluptatem
              nostrum asperiores cumque.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
