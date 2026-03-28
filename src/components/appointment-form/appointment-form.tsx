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
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CalendarIcon,
  ChevronDownIcon,
  Clock,
  Dog,
  Phone,
  User,
} from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { IMaskInput } from 'react-imask';
import { format, setHours, setMinutes, startOfToday } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const appointmentFormSchema = z
  .object({
    tutorName: z.string().min(3, 'O nome do tutor é obrigatório'),
    petName: z.string().min(3, 'O nome do pet é obrigatório'),
    phone: z.string().min(15, 'O telefone é obrigatório'),
    description: z.string().min(11, 'A descrição é obrigatória'),
    scheduleAt: z
      .date({
        error: 'A data é obrigatória',
      })
      .min(startOfToday(), {
        message: 'A data não pode ser no passado',
      }),
    time: z.string().min(1, 'A hora é obrigatória'),
  })
  .refine(
    (data) => {
      const [hour, minute] = data.time.split(':');
      const scheduleDateTime = setMinutes(
        setHours(data.scheduleAt, Number(hour)),
        Number(minute)
      );

      return scheduleDateTime > new Date();
    },
    {
      path: ['time'],
      message: 'O horário não pode ser no passado',
    }
  );

type AppointFormValues = z.infer<typeof appointmentFormSchema>;

export const AppointmentForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AppointFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
      scheduleAt: undefined,
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
              Telefone
            </label>

            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                size={20}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <IMaskInput
                    mask="(00) 00000-0000"
                    placeholder="Telefone"
                    className="pl-10 flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-sm 
                    text-content-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                    placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 
                    focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-secondary 
                    focus:border-border-brand focus-visible:border-border-brand aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                    onAccept={(value) => field.onChange(value)}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>

            {errors.phone && (
              <p className="text-red-500 text-sm">
                {errors.phone.message as string}
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

          <div>
            <Controller
              control={control}
              name="scheduleAt"
              render={({ field }) => (
                <div className="flex flex-col">
                  <label className="text-label-medium-size text-content-primary">
                    Data
                  </label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          'w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary',
                          !field.value && 'text-content-secondary'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <CalendarIcon
                            className="text-content-brand"
                            size={20}
                          />

                          {field.value ? (
                            format(field.value, 'dd/MM/yyyy')
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </div>

                        <ChevronDownIcon className="opacity-50 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        disabled={(date) => date < startOfToday()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />

            {errors.scheduleAt && (
              <p className="text-red-500 text-sm">
                {errors.scheduleAt.message as string}
              </p>
            )}
          </div>

          <div>
            <Controller
              control={control}
              name="time"
              render={({ field }) => (
                <div className="flex flex-col">
                  <label className="text-label-medium-size text-content-primary">
                    Hora
                  </label>

                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value || ''}
                  >
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-content-brand" />
                        <SelectValue placeholder="--:-- --" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_OPTIONS.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            {errors.time && (
              <p className="text-red-500 text-sm">
                {errors.time.message as string}
              </p>
            )}
          </div>

          <button type="submit">Salvar</button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const generateTimeOptions = () => {
  const times = [];

  for (let hour = 9; hour <= 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 21 && minute > 0) break;

      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      times.push(timeString);
    }
  }

  return times;
};

const TIME_OPTIONS = generateTimeOptions();
