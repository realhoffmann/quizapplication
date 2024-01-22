<template>
    <select id="country-selector" class="form-control" v-model="selectedCountry" required>
      <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.name }}</option>
    </select>
</template>

<script>
export default {
  props: {
    country: String,
  },
  data() {
    return {
      selectedCountry: this.country || 'none',
      countries: [
        { code: 'AT', name: 'Austria' },
        { code: 'DE', name: 'Germany'},
        { code: 'CH', name: 'Switzerland'},
        { code: 'DK', name: 'Denmark' },
        { code: 'BE', name: 'Belgium' },
        { code: 'BG', name: 'Bulgaria' },
        { code: 'EE', name: 'Estonia' },
        { code: 'FI', name: 'Finland' },
        { code: 'FR', name: 'France' },
        { code: 'GR', name: 'Greece' },
        { code: 'IE', name: 'Ireland' },
        { code: 'IT', name: 'Italy' },
        { code: 'XK', name: 'Kosovo'},
        { code: 'LV', name: 'Latvia' },
        { code: 'LT', name: 'Lithuania' },
        { code: 'LU', name: 'Luxembourg' },
        { code: 'MT', name: 'Malta' },
        { code: 'NL', name: 'Netherlands' },
        { code: 'PL', name: 'Poland' },
        { code: 'PT', name: 'Portugal' },
        { code: 'RO', name: 'Romania' },
        { code: 'SE', name: 'Sweden' },
        { code: 'SK', name: 'Slovakia' },
        { code: 'SI', name: 'Slovenia' },
        { code: 'ES', name: 'Spain' },
        { code: 'CZ', name: 'Czech Republic' },
        { code: 'HU', name: 'Hungary' },
        { code: 'GB', name: 'Great Britain' },
        { code: 'CY', name: 'Cyprus' },
      ],
    };
  },
  watch: {
    selectedCountry(newCountry) {
      console.log("Selected Country:", newCountry);
      this.$emit('input', newCountry);
    },
  },
};
</script>