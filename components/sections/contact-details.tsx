import Image from "next/image"
import { Phone, Mail, Printer } from "lucide-react"

export default function ContactDetails() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Address</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* USA Office */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-800">
            <div className="flex">
              <div className="w-1/3 relative h-full min-h-[200px]">
                <Image src="/images/statue-of-liberty.jpg" alt="USA Office" fill className="object-cover" />
              </div>
              <div className="w-2/3 p-6">
                <h3 className="text-xl font-bold mb-4">USA</h3>
                <p className="mb-4">
                  <span className="font-semibold">ESG Inc.</span> 8751 Collin Mckinney PKWY, Suite#601, Mckinney,
                  TX-75070
                </p>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-400 mr-3" />
                    <span>+1 (781) 435-8082 / (781) 425-1012</span>
                  </div>

                  <div className="flex items-center">
                    <Printer className="h-5 w-5 text-blue-400 mr-3" />
                    <span>+1 (781) 214-6468</span>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-400 mr-3" />
                    <a href="mailto:info@exesg.us" className="hover:text-blue-400 transition-colors">
                      info@exesg.us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UK Office */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-800">
            <div className="flex">
              <div className="w-1/3 relative h-full min-h-[200px]">
                <Image src="/images/uk-flag.jpg" alt="UK Office" fill className="object-cover" />
              </div>
              <div className="w-2/3 p-6">
                <h3 className="text-xl font-bold mb-4">UK</h3>
                <p className="mb-4">
                  <span className="font-semibold">ESG LTD.</span> 19A Hawthorne Road Caversham RG46LY
                </p>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-400 mr-3" />
                    <span>+44 7885 406777</span>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-400 mr-3" />
                    <a href="mailto:info@exesg.us" className="hover:text-blue-400 transition-colors">
                      info@exesg.us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
