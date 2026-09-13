// Original solution-scale adaptation of the local VVH ExO references.
export function applyConsulting(copy) {
  const pages = {
    en: ['Build around the outcome.', 'Purpose, experimentation, and measured progress guide each solution—from the first workflow to dependable operation.', `
<h2>ExO principles, applied to a solution</h2>
<p>The approach draws on Exponential Organizations (ExO) principles: a clear purpose, access to existing resources and expertise, rapid experimentation, and decisions informed by evidence. The starting point is a specific business problem and the people affected by it.</p>
<h2>01 / Define what success means</h2>
<p>Establish the outcome, who benefits, and the constraints. Measure the current workflow so improvements in time, quality, cost, and user experience can be evaluated against a real baseline.</p>
<h2>02 / Map one useful workflow</h2>
<p>Break the work into tasks. Identify where human judgment matters, where AI can assist, and which actions can operate within agreed limits. Clarify information sources, permissions, responsibilities, and handoffs.</p>
<h2>03 / Connect the right resources</h2>
<p>Build on useful systems, data, and services already available. Bring in specialist expertise where needed, and design clear interfaces between people, applications, and agents. Involve the people doing the work throughout development.</p>
<h2>04 / Test the critical assumptions</h2>
<p>Start with a small experiment that tests the greatest uncertainty. Agree on success criteria before building, gather user feedback, and use the evidence to refine, continue, or stop the approach.</p>
<h2>05 / Make operation accountable</h2>
<p>Define action limits and approval points. Evaluate results, retain activity records, provide a way to reverse changes where feasible, and route exceptions to a person. These controls are part of the solution from the beginning.</p>
<h2>06 / Measure, learn, and expand</h2>
<p>Track outcomes alongside reliability and operating cost. Review what happens in practice and improve the workflow. Extend the solution when evidence supports the next step.</p>
<h2>A concrete starting point</h2>
<p>For an incoming-request workflow, a first pilot might classify requests, retrieve supporting information, and prepare a response for human review. Routing or other actions can be introduced as accuracy, permissions, and exception handling are demonstrated.</p>
<p>An initial engagement establishes the workflow map, measures of success, experiment plan, and a delivery roadmap shaped by the findings.</p>`],
    es: ['Construir a partir del resultado.', 'Propósito, experimentación y progreso medible guían cada solución, desde el primer flujo de trabajo hasta una operación fiable.', `
<h2>Principios ExO aplicados a una solución</h2>
<p>El enfoque se inspira en los principios de las Organizaciones Exponenciales (ExO): propósito claro, acceso a recursos y conocimientos existentes, experimentación rápida y decisiones basadas en evidencia. El punto de partida es un problema empresarial concreto y las personas a las que afecta.</p>
<h2>01 / Definir el éxito</h2><p>Establecer el resultado, quién se beneficia y las restricciones. Medir el proceso actual para evaluar mejoras en tiempo, calidad, coste y experiencia de uso frente a una referencia real.</p>
<h2>02 / Detallar un flujo de trabajo útil</h2><p>Dividir el trabajo en tareas. Identificar dónde importa el criterio humano, dónde puede ayudar la IA y qué acciones pueden operar dentro de límites acordados. Aclarar fuentes de información, permisos, responsabilidades y traspasos.</p>
<h2>03 / Conectar los recursos adecuados</h2><p>Aprovechar sistemas, datos y servicios disponibles. Incorporar especialistas cuando haga falta y diseñar interfaces claras entre personas, aplicaciones y agentes. Involucrar durante el desarrollo a quienes realizan el trabajo.</p>
<h2>04 / Probar las hipótesis críticas</h2><p>Comenzar con un experimento pequeño que aborde la mayor incertidumbre. Acordar criterios de éxito antes de construir, recoger comentarios de usuarios y utilizar la evidencia para ajustar, continuar o detener el enfoque.</p>
<h2>05 / Establecer una operación responsable</h2><p>Definir límites de acción y puntos de aprobación. Evaluar resultados, conservar registros de actividad, permitir revertir cambios cuando sea viable y derivar excepciones a una persona. Estos controles forman parte de la solución desde el principio.</p>
<h2>06 / Medir, aprender y ampliar</h2><p>Seguir los resultados junto con la fiabilidad y el coste operativo. Revisar lo que ocurre en la práctica y mejorar el proceso. Ampliar la solución cuando la evidencia respalde el siguiente paso.</p>
<h2>Un punto de partida concreto</h2><p>Para gestionar solicitudes entrantes, un primer piloto podría clasificarlas, recuperar información de apoyo y preparar una respuesta para revisión humana. El enrutamiento u otras acciones pueden incorporarse a medida que se demuestren la precisión, los permisos y la gestión de excepciones.</p><p>Un trabajo inicial establece el mapa del proceso, las medidas de éxito, el plan experimental y una hoja de ruta de implementación basada en los hallazgos.</p>`],
    pt: ['Construir a partir do resultado.', 'Propósito, experimentação e progresso mensurável orientam cada solução, do primeiro fluxo de trabalho à operação confiável.', `
<h2>Princípios ExO aplicados a uma solução</h2><p>A abordagem se inspira nos princípios das Organizações Exponenciais (ExO): propósito claro, acesso a recursos e conhecimentos existentes, experimentação rápida e decisões baseadas em evidências. O ponto de partida é um problema de negócio específico e as pessoas afetadas por ele.</p>
<h2>01 / Definir o sucesso</h2><p>Estabelecer o resultado, quem se beneficia e as restrições. Medir o processo atual para avaliar melhorias em tempo, qualidade, custo e experiência de uso em relação a uma referência real.</p>
<h2>02 / Detalhar um fluxo de trabalho útil</h2><p>Dividir o trabalho em tarefas. Identificar onde o julgamento humano importa, onde a IA pode ajudar e quais ações podem operar dentro de limites acordados. Esclarecer fontes de informação, permissões, responsabilidades e transferências de trabalho.</p>
<h2>03 / Conectar os recursos certos</h2><p>Aproveitar sistemas, dados e serviços disponíveis. Incorporar especialistas quando necessário e projetar interfaces claras entre pessoas, aplicações e agentes. Envolver durante o desenvolvimento as pessoas que realizam o trabalho.</p>
<h2>04 / Testar as hipóteses críticas</h2><p>Começar com um pequeno experimento que investigue a maior incerteza. Combinar critérios de sucesso antes de construir, reunir comentários dos usuários e usar as evidências para ajustar, continuar ou interromper a abordagem.</p>
<h2>05 / Estabelecer uma operação responsável</h2><p>Definir limites de ação e pontos de aprovação. Avaliar resultados, manter registros de atividade, permitir reverter mudanças quando viável e encaminhar exceções a uma pessoa. Esses controles fazem parte da solução desde o início.</p>
<h2>06 / Medir, aprender e ampliar</h2><p>Acompanhar resultados junto com a confiabilidade e o custo operacional. Revisar o que acontece na prática e melhorar o fluxo. Ampliar a solução quando as evidências sustentarem o próximo passo.</p>
<h2>Um ponto de partida concreto</h2><p>Para lidar com solicitações recebidas, um primeiro piloto poderia classificá-las, recuperar informações de apoio e preparar uma resposta para revisão humana. O encaminhamento ou outras ações podem ser introduzidos à medida que a precisão, as permissões e o tratamento de exceções forem demonstrados.</p><p>Um trabalho inicial estabelece o mapa do fluxo, as medidas de sucesso, o plano de experimentação e um roteiro de implementação orientado pelos resultados.</p>`]
  };
  for (const [locale, page] of Object.entries(pages)) {
    copy[locale].pages.consulting = [copy[locale].pages.consulting[0], ...page];
  }
}
