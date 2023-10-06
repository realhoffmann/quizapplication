<template>
    <div class="answer-option">
        <TextInput :id="inputId" :name="inputName" :placeholder="inputPlaceholder" />
        <Checkbox :id="checkboxId" :name="checkboxName" :value="checkboxValue" />
    </div>
</template>

<script>
import TextInput from '../atoms/TextInputAtom.vue';
import Checkbox from '../atoms/CheckboxAtom.vue';

export default {
    props: {
        inputId: String,
        inputName: String,
        inputPlaceholder: String,
        checkboxId: String,
        checkboxName: String,
        checkboxValue: String,
    },
    components: {
        TextInput,
        Checkbox,
    },
};
</script>
