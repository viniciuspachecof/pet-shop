'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dog, User } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, 'O nome do tutor é obrigatório'),
  petName: z.string().min(3, 'O nome do pet é obrigatório'),
  phone: z.string().min(11, 'O telefone é obrigatório'),
  description: z.string().min(11, 'A descrição é obrigatória'),
});

type AppointFormValues = z.infer<typeof appointmentFormSchema>;

export const AppointmentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
    },
  });

  const onSubmit = (data: AppointFormValues) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">Novo Agendamento</Button>
      </DialogTrigger>

      <DialogContent
        variant="appointment"
        overlayVariant="blurred"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle size="modal">Agenda um atendimento</DialogTitle>
          <DialogDescription size="modal">
            Preencha os dados do cliente para realizar o agendamento:
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-label-medium-size text-content-primary">
              Nome do tutor
            </label>

            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                size={20}
              />
              <Input
                placeholder="Nome do tutor"
                className="pl-10"
                {...register('tutorName')}
              />
            </div>

            {errors.tutorName && (
              <p className="text-red-500 text-sm">
                {errors.tutorName.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="text-label-medium-size text-content-primary">
              Nome do pet
            </label>

            <div className="relative">
              <Dog
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                size={20}
              />
              <Input
                placeholder="Nome do pet"
                className="pl-10"
                {...register('petName')}
              />
            </div>

            {errors.petName && (
              <p className="text-red-500 text-sm">
                {errors.petName.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="text-label-medium-size text-content-primary">
              Descrição do serviço
            </label>

            <Textarea
              placeholder="Descrição do serviço"
              className="resize-none"
              {...register('description')}
            />

            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message as string}
              </p>
            )}
          </div>

          <button type="submit">Salvar</button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
