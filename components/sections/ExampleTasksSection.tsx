import { Card } from "@/components/ui/Card";
import { Section } from "@/components/sections/Section";

type ExampleTask = {
  title: string;
  problemDescription: string;
  difficultyLabel: string;
  theme: "peach" | "blue" | "violet" | "mint" | "amber" | "rose" | "green" | "slate";
};

type TaskPrompt = {
  title: string;
  description: string;
  inputPlaceholder: string;
  inputAriaLabel?: string;
};

type ExampleTasksSectionProps = {
  sectionTitle: string;
  tasks: ExampleTask[];
  taskPrompt?: TaskPrompt;
};

import styles from "./ExampleTasksSection.module.css";

const taskThemeClassMap: Record<ExampleTask["theme"], string> = {
  peach: styles.themePeach,
  blue: styles.themeBlue,
  violet: styles.themeViolet,
  mint: styles.themeMint,
  amber: styles.themeAmber,
  rose: styles.themeRose,
  green: styles.themeGreen,
  slate: styles.themeSlate
};

function createInputId(title: string): string {
  return `${title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-input`;
}

export function ExampleTasksSection({ sectionTitle, tasks, taskPrompt }: ExampleTasksSectionProps) {
  const inputId = taskPrompt ? createInputId(taskPrompt.title) : "task-request-input";
  const hasTasks = tasks.length > 0;
  const sectionClassName = hasTasks ? undefined : styles.promptOnly;

  return (
    <Section className={sectionClassName}>
      {hasTasks ? (
        <>
          <div className={styles.header}>
            <h2 className={styles.title}>{sectionTitle}</h2>
          </div>

          <div className={styles.grid}>
            {tasks.map((task, index) => (
              <Card
                as="article"
                className={`${styles.taskCard} ${taskThemeClassMap[task.theme]} ${
                  index < 3 ? styles.recognitionHigh : ""
                }`}
                hover
                key={task.title}
              >
                <h3 className={styles.taskTitle}>{task.title}</h3>
                <p className={styles.problemDescription}>{task.problemDescription}</p>
                <p className={styles.difficultyLabel}>{task.difficultyLabel}</p>
              </Card>
            ))}
          </div>
        </>
      ) : null}

      {taskPrompt ? (
        <div className={styles.promptCard}>
          <h3 className={styles.promptTitle}>{taskPrompt.title}</h3>
          <p className={styles.promptDescription}>{taskPrompt.description}</p>
          <label className={styles.promptLabel} htmlFor={inputId}>
            {taskPrompt.inputAriaLabel ?? "Describe your Shopify task"}
          </label>
          <input
            className={styles.promptInput}
            id={inputId}
            name="taskDescription"
            placeholder={taskPrompt.inputPlaceholder}
            type="text"
          />
        </div>
      ) : null}
    </Section>
  );
}
