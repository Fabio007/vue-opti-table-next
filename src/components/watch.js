export default { // eslint-disable-next-line
  'models.search': function (value) {
    if (!this.serverSidePagination) {
      this.currentPage = 1;
    }
  },
  tableWidth() {
    this.isRendered = !!document.getElementById(this.randomTableId) && !!document.getElementById(this.randomScrollId);
  },
  items() {
    if (!this.serverSidePagination) {
      this.$_changePageAction(1);
    }
  },
  tableRows() {
    this.currentPage = 1;
  },
  defaultRows(newVal) {
    this.paginationSize = newVal;
  },
  localHeaderFields(newVal) {
    this.localTableModel.columnsOrder = newVal;
    this.$emit('click', this.localTableModel);
  },
  headerFields: {
    immediate: true,
    handler() {
      this.localTableModel = this.tableModel;
      this.localHeaderFields = this.headerFields;
      this.localTableModel.displayColumns = this.localHeaderFields.filter(field => field.display !== false);
      this.localHeaderFields.forEach((col) => {
        if (col.item.filter && !this.filterFieldsModels[col.item.key]) this.$set(this.filterFieldsModels, col.item.key, []);
        // if (col.item.filter) this.filterFieldsModels[col.item.key] = [{ condition: 'greater_equal', value: 20 }, { condition: 'less_equal', value: 40 }];
      });
      // if (window.localStorage.getItem(this.name)) {
      //   this.localTableModel.displayColumns = JSON.parse(window.localStorage.getItem(this.name)).displayColumns;
      //   this.localHeaderFields = JSON.parse(window.localStorage.getItem(this.name)).columnsOrder;
      // } else {
      //   this.localHeaderFields = this.headerFields;
      //   this.localTableModel.displayColumns = this.localHeaderFields.filter(field => field.display !== false);
      // }
      this.$emit('click', this.localTableModel);
    },
    deep: true,
  },
  $c_shouldDisplayColumn: {
    handler() {
      this.touchedSettingsColumns = true;
    },
    deep: true,
  },
  filterFieldsModels: {
    handler() {
      this.$_submitColumnFilter();
    },
    deep: true,
  },
};
