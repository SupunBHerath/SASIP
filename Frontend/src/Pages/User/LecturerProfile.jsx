import React from "react";

export default function Widget() {
  return (
    <body className="font-sans bg-background text-foreground">
      <div className="container mx-auto p-6 md:p-12 min-h-screen flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 flex-grow">
          <div
            className="bg-white p-8 md:p-12 rounded-lg shadow-lg text-card-foreground flex flex-col justify-between h-full"
            style={{ height: "550px", border: "1px solid black" }}
          >
            <div className="flex flex-col items-center">
              <img
                src="https://kingnish-sdxl-flash.hf.space/file=/tmp/gradio/677824b734e7faa976c87d0f931c3b6b7ecc5940/34cce6af-4671-42ef-b37e-9cad0a08f932.png"
                alt="Profile Picture of Dr. Jane Doe"
                className="rounded-full w-48 h-48 md:w-64 md:h-64 mb-4 md:mb-8 object-cover"
              />
              <h1 className="text-2xl md:text-4xl font-bold text-center text-black">
                Dr. Jane Doe
              </h1>
              <div className="text-center mt-2 md:mt-4 space-y-1 md:space-y-2">
                <p className="text-sm md:text-base text-black">
                  Subject: <span className="font-semibold">Physics</span>
                </p>
                <p className="text-sm md:text-base text-black">
                  Stream: <span className="font-semibold">Science</span>
                </p>
                <p className="text-sm md:text-base text-black">
                  Experience: <span className="font-semibold">Since 2000</span>
                </p>
              </div>
              <div className="flex justify-center mt-4 md:mt-8 space-x-4 md:space-x-8">
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <img
                    src="http://localhost:7878/openui/32x32.svg?text=F"
                    alt="Facebook Profile"
                    className="w-6 h-6 md:w-8 md:h-8"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="#"
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                >
                  <img
                    src="http://localhost:7878/openui/32x32.svg?text=YT"
                    alt="YouTube Channel"
                    className="w-6 h-6 md:w-8 md:h-8"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-8 md:space-y-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Bio</h2>
              <p className="text-muted-foreground leading-relaxed">
                Dr. Jane Doe is a seasoned educator and researcher with over 15
                years of experience in Computer Science. Her expertise lies in
                Artificial Intelligence, particularly in the fields of Machine
                Learning and Natural Language Processing. She is passionate
                about fostering the next generation of tech innovators and her
                teaching style is known for its engaging and practical approach.
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Qualifications
              </h2>
              <div className="grid gap-4 md:gap-8">
                <div
                  style={{ border: "1px solid black" }}
                  className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 text-card-foreground"
                >
                  <div className="flex items-start mb-2">
                    <img
                      src="../../../public/Icon/Logo_color.png"
                      alt="Ph.D. Icon"
                      className="rounded-full w-12 h-12 mr-4"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold">
                        Ph.D. in Computer Science
                      </h3>
                      <p className="text-sm md:text-base">
                        Stanford University, USA (2005)
                      </p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base italic mt-2">
                    Thesis: 'Advanced Techniques in Deep Learning for Natural
                    Language Processing'
                  </p>
                </div>
                <div
                  style={{ border: "1px solid black" }}
                  className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 text-card-foreground"
                >
                  <div className="flex items-start mb-2">
                    <img
                      src="../../../public/Icon/Logo_color.png"
                      alt="MSc Icon"
                      className="rounded-full w-12 h-12 mr-4"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold">
                        M.Sc. in Computer Science
                      </h3>
                      <p className="text-sm md:text-base">
                        Stanford University, USA (2003)
                      </p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base italic mt-2">
                    Thesis: 'Applications of Machine Learning in Robotics'
                  </p>
                </div>
                <div
                  style={{ border: "1px solid black" }}
                  className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 text-card-foreground"
                >
                  <div className="flex items-start mb-2">
                    <img
                      src="../../../public/Icon/Logo_color.png"
                      alt="BSc Icon"
                      className="rounded-full w-12 h-12 mr-4"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold">
                        B.Sc. in Computer Science
                      </h3>
                      <p className="text-sm md:text-base">
                        Stanford University, USA (2001)
                      </p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base mt-2">
                    Specialization: Artificial Intelligence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-16">
          <div className="border-t border-zinc-700 text-center"></div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-4 text-center">
            Timetable
          </h2>
          <div className="d-flex justify-content-center p-6 rounded-lg">
            <img
              src="https://th.bing.com/th/id/OIP.WTOliyGuak0D8jlP_wmqLgAAAA?rs=1&pid=ImgDetMain"
              alt="Timetable"
            />
          </div>
        </div>
      </div>
    </body>
  );
}
