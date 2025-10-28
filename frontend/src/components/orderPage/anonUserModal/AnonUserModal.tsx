"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/buttons/buttonStart/ButtonStart";
import Link from "next/link";

export default function AnonUserModal({ onClose }: { onClose: () => void }) {
    return (
        <AlertDialog open onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="">Debes iniciar sesión</AlertDialogTitle>
                    <AlertDialogDescription>
                        Para poder consultar tu pedido por WhatsApp necesitas iniciar sesión o crear una cuenta.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} className="mt-6">Cancelar</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Link href="/auth/signIn" className="bg-white hover:bg-white px-0 py-0">
                            <GetStartedButton text="Iniciar Sesión" className="h-10 mt-12" />
                        </Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}