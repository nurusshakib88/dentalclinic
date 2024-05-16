import { FormatQuote } from "@mui/icons-material";
import Patient1 from "../assets/patient1.png";

const PatientTestimonial = () => {
  const Testimonial = ({ msg, name, position, img }) => (
    <div className="bg-white px-10 py-16 rounded-lg">
      <p className="text-[14px]">"{msg}"</p>

      <div className="flex gap-4 mt-8">
        <img
          src={img}
          className="w-[60px] aspect-square object-cover rounded-full"
          alt=""
        />
        <div>
          <h2>{name}</h2>
          <p className="text-[14px]">{position}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-20">
      <div className="px-[350px] text-center">
        <h3 className="text-primary font-semibold">Review</h3>
        <h1 className="text-[36px] font-bold mb-10">Our Patients Says</h1>
      </div>

      <div className="grid grid-cols-3 relative gap-10">
        <Testimonial
          name="Joshua Jones"
          img={Patient1}
          position="Business Manager"
          msg="Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        />
        <Testimonial
          name="Joshua Jones"
          img={Patient1}
          position="Business Manager"
          msg="Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        />
        <Testimonial
          name="Joshua Jones"
          img={Patient1}
          position="Business Manager"
          msg="Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        />

        <FormatQuote
          className="absolute -top-16 rotate-180 text-blue-100"
          sx={{ fontSize: "120px" }}
        />
        <FormatQuote
          className="absolute -bottom-16 right-0  text-blue-100"
          sx={{ fontSize: "120px" }}
        />
      </div>
      <div className="flex gap-5 mt-20 justify-center">
        <div className="bg-primary w-[52px] h-[8px] rounded-full"></div>
        <div className="bg-primary w-[52px] h-[8px] rounded-full"></div>
        <div className="bg-primary w-[52px] h-[8px] rounded-full"></div>
        <div className="bg-primary w-[52px] h-[8px] rounded-full"></div>
      </div>
    </div>
  );
};

export default PatientTestimonial;
