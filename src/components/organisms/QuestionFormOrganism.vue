<template>
    <div class="question-container">
        <div class="question">
            <h1>Question</h1><br>
            <TextInput id="question" name="question" placeholder="Question" />
            <p>Mark the correct answers</p>
        </div>
    </div><br>

    <div class="button-container justify-content-center">
        <AnswerOption class="answerA" inputId="answerA" inputName="answerA" inputPlaceholder="Answer a)"
            checkboxId="answerAIsTrue" checkboxName="answerAIsTrue" checkboxValue="true" />
        <AnswerOption class="answerB" inputId="answerB" inputName="answerB" inputPlaceholder="Answer b)"
            checkboxId="answerBIsTrue" checkboxName="answerBIsTrue" checkboxValue="true" />
    </div>
    <div class="button-container justify-content-center">
        <AnswerOption class="answerC" inputId="answerC" inputName="answerC" inputPlaceholder="Answer c)"
            checkboxId="answerCIsTrue" checkboxName="answerCIsTrue" checkboxValue="true" />
        <AnswerOption class="answerD" inputId="answerD" inputName="answerD" inputPlaceholder="Answer d)"
            checkboxId="answerDIsTrue" checkboxName="answerDIsTrue" checkboxValue="true" />
    </div>
</template>

<script>
import AnswerOption from '../molecules/AnswerOptionMolecule.vue';
import TextInput from '../atoms/TextInputAtom.vue';

export default {
    components: {
        AnswerOption,
        TextInput,
    },
};
</script>
