import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { z } from "zod";
import classes from "./index.module.css";

const schema = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
    })
    .superRefine((state, ctx) => {
        if (state.firstName.length === 0 && state.lastName.length > 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "First name is required if last name is provided",
                path: ["firstName"],
            });
        }

        return;
    });

type Schema = z.infer<typeof schema>;

function App() {
    const form = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    console.log(form.formState.errors);

    return (
        <form onSubmit={form.handleSubmit((data) => console.log(data))}>
            <label>
                First name
                <input
                    {...form.register("firstName")}
                    className={classNames(classes.input, {
                        [classes.error]: form.formState.errors.firstName,
                    })}
                />
            </label>

            <label>
                Last name
                <input
                    {...form.register("lastName")}
                    className={classNames(classes.input, {
                        [classes.error]: form.formState.errors.lastName,
                    })}
                />
            </label>

            <button type="submit">Submit</button>
        </form>
    );
}

export default App;
