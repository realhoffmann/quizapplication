
<template>
  <div>
    <select id="salutation-selector" class="form-control" v-model="selectedSalutation" required>
      <option disabled value="">-- Select an option --</option>
      <option v-for="salutation in salutations" :key="salutation.value" :value="salutation.value">{{ salutation.label }}</option>
    </select>
  </div>
</template>


<script>
export default {
  props: {
    salutation: String,
  },
  data() {
    return {
      selectedSalutation: this.salutation,
      salutations: [
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' },
        { value: 'OTHER', label: 'Other' },
      ],
    };
  },
  watch: {
    selectedSalutation(newSalutation) {
      this.$emit('input', newSalutation);
    },
  },
};
</script>


