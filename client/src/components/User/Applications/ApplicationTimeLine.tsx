import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
  TimelineBody,
} from "@material-tailwind/react";
import {
  TrashIcon,
  InboxIcon,
  TicketIcon,
  CheckIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";

function ApplicationTimeline({ applicationStatus }: any) {
  const renderTimelineItems = () => {
    switch (applicationStatus) {
      case "Đồng ý":
        return (
          <>
            <TimelineItem className="h-28">
              <TimelineConnector className="!w-[78px]" />
              <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                <TimelineIcon>
                  <TicketIcon className="h-5 w-5" />
                </TimelineIcon>
                <div className="flex flex-col gap-1">
                  <Typography color="blue-gray">Yêu cầu</Typography>
                  <Typography color="gray" className="text-sm font-normal">
                    {/* {new Date().toLocaleString()} */}
                  </Typography>
                </div>
              </TimelineHeader>
              <TimelineBody></TimelineBody>
            </TimelineItem>
            <TimelineConnector className="w-[78px]" />
            <TimelineItem className="h-28">
              <TimelineConnector className="!w-[78px]" />
              <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                <TimelineIcon color="green">
                  <InboxIcon className="h-5 w-5" />
                </TimelineIcon>
                <div className="flex flex-col gap-1">
                  <Typography color="blue-gray">Gửi yêu cầu</Typography>
                </div>
              </TimelineHeader>
              <TimelineBody></TimelineBody>
            </TimelineItem>
            <TimelineItem className="h-28">
              <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                <TimelineIcon color="green">
                  <CheckIcon className="h-5 w-5" />
                </TimelineIcon>
                <div className="flex flex-col gap-1">
                  <Typography color="blue-gray">Yêu cầu chấp nhận </Typography>
                  <Typography color="gray" className="text-sm font-normal">
                    {/* {new Date().toLocaleString()} */}
                  </Typography>
                </div>
              </TimelineHeader>
              <TimelineBody></TimelineBody>
            </TimelineItem>
          </>
        );
      case "Đang chờ":
        return (
          <>
            <TimelineItem className="h-28">
              <TimelineConnector className="!w-[78px]" />
              <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                <TimelineIcon>
                  <TicketIcon className="h-5 w-5" />
                </TimelineIcon>
                <div className="flex flex-col gap-1">
                  <Typography color="blue-gray">Yêu cầu</Typography>
                  <Typography color="gray" className="text-sm font-normal">
                    {/* {new Date().toLocaleString()} */}
                  </Typography>
                </div>
              </TimelineHeader>
              <TimelineBody></TimelineBody>
            </TimelineItem>
            <TimelineItem className="h-28">
              <TimelineItem className="h-28">
                <TimelineConnector className="!w-[78px]" />
                <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                  <TimelineIcon color="green">
                    <InboxIcon className="h-5 w-5" />
                  </TimelineIcon>
                  <div className="flex flex-col gap-1">
                    <Typography color="blue-gray">Gửi yêu cầu</Typography>
                  </div>
                </TimelineHeader>
                <TimelineBody></TimelineBody>
              </TimelineItem>
            </TimelineItem>

            <TimelineItem className="h-28">
              <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                <TimelineIcon color="orange">
                  <WalletIcon className="h-5 w-5" />
                </TimelineIcon>
                <div className="flex flex-col gap-1">
                  <Typography color="blue-gray">
                    Đang đợi nhà sáng lập{" "}
                  </Typography>
                  <Typography color="gray" className="text-sm font-normal">
                    {/* {new Date().toLocaleString()} */}
                  </Typography>
                </div>
              </TimelineHeader>
              <TimelineBody></TimelineBody>
            </TimelineItem>
          </>
        );
      case "Từ chối":
        return (
          <>
            <TimelineItem className="h-28">
              <TimelineConnector className="!w-[78px]" />
              <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                <TimelineIcon>
                  <TicketIcon className="h-5 w-5" />
                </TimelineIcon>
                <div className="flex flex-col gap-1">
                  <Typography color="blue-gray">Yêu cầu</Typography>
                  <Typography color="gray" className="text-sm font-normal">
                    {/* {new Date().toLocaleString()} */}
                  </Typography>
                </div>
              </TimelineHeader>
              <TimelineBody></TimelineBody>
            </TimelineItem>
            <TimelineConnector className="w-[78px]" />
            <TimelineItem className="h-28">
              <TimelineConnector className="!w-[78px]" />
              <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                <TimelineIcon color="green">
                  <InboxIcon className="h-5 w-5" />
                </TimelineIcon>
                <div className="flex flex-col gap-1">
                  <Typography color="blue-gray">Gửi yêu cầu</Typography>
                </div>
              </TimelineHeader>
              <TimelineBody></TimelineBody>
            </TimelineItem>
            <TimelineConnector className="w-[78px]" />
            <TimelineItem className="h-28">
              <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                <TimelineIcon color="red">
                  <TrashIcon className="h-5 w-5" />
                </TimelineIcon>
                <div className="flex flex-col gap-1">
                  <Typography color="blue-gray">Yêu cầu bị từ chối </Typography>
                </div>
              </TimelineHeader>
              <TimelineBody></TimelineBody>
            </TimelineItem>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[25rem]">
      <TimelineItem>
        <Timeline>{renderTimelineItems()}</Timeline>
      </TimelineItem>
    </div>
  );
}

export default ApplicationTimeline;
