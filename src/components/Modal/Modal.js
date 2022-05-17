import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Button } from "react-bootstrap";
import React, { useEffect } from "react";

export default function Modal(props) {
  const [show, setShow] = React.useState(false);

  const handleModal = () => {
    setShow(!show);
    console.log("Modal Visibile ->", show);
  };

  return <> </>;
}
