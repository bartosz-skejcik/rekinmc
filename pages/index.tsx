import { Dialog, Transition } from "@headlessui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import data from "../public/codes.json";

const Home: NextPage = () => {
    let [isOpen, setIsOpen] = useState(false);
    const [text, changeText] = useState("");
    const [message, changeMessage] = useState("");

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    function checkCode(code: string): void {
        if (code == "") changeMessage("Prosimy wpisać kod");
        if (!data) return;
        data.available.forEach((item) => {
            if (item == code) {
                changeMessage("Kod jest poprawny");
            }
        });
    }

    return (
        <section className="bg-gray-200 h-screen w-screen font-mono">
            <Head>
                <title>RekinMC.PL - Wysyłamy sms</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <section className="flex items-center justify-center flex-row">
                <div className="h-screen w-3/5 flex items-center justify-center flex-col gap-3">
                    <h2 className="text-blue-500 font-extrabold text-3xl">
                        RekinMC.PL - Wysyłamy SMS'y
                    </h2>
                    <button
                        type="button"
                        onClick={openModal}
                        className={`rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        Wykorzystaj kod
                    </button>
                </div>
                <div className="flex w-2/5 h-screen items-center justify-center flex-row">
                    <img src="/bg.svg" className="w-full" />
                </div>
            </section>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold leading-6 text-blue-700"
                                    >
                                        Wpisz swój kod!
                                    </Dialog.Title>
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            className="border-2 border-blue-300 rounded-lg"
                                            onChange={(e) =>
                                                changeText(e.target.value)
                                            }
                                        />
                                        <p className="text-red-500 text-sm mt-1">
                                            {message}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        // when someone clicks the input i want it to have border-blue-500
                                        className="rounded-lg bg-blue-500 text-white px-3 py-1 mt-3 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                        onClick={() => checkCode(text)}
                                    >
                                        Zatwierdź
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </section>
    );
};

export default Home;
