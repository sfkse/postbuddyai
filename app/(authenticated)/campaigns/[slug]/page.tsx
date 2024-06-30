"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import CardGroup from "@/app/components/CardGroup";
import PageHeading from "@/app/components/PageHeading";
import { capitalize } from "@/app/utils/string";
import { useParams } from "next/navigation";

function CampaignDetail() {
  const { slug } = useParams();
  const breadcrumbItems = [
    { title: "Campaigns", href: "/campaigns" },
    { title: capitalize(slug as string), href: "" },
  ];
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <PageHeading>{capitalize(slug as string)}</PageHeading>
      <CardGroup showCreateOption />
    </>
  );
}

export default CampaignDetail;

