import type { Metadata } from "next"
import IoTPage from "./iot-page"

export const metadata: Metadata = {
  title: "Internet of Things (IoT) | ESGit - Connected Intelligence Solutions",
  description:
    "Discover ESGit's comprehensive IoT solutions that connect devices, systems, and processes to drive intelligent automation, real-time insights, and operational excellence across industries.",
  keywords:
    "Internet of Things, IoT, Connected Devices, Smart Sensors, Industrial IoT, Edge Computing, IoT Analytics, Smart Cities, IoT Security",
}

export default function IoT() {
  return <IoTPage />
}
