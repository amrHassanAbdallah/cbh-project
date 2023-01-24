# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
Assuming that we don't care about the previously generated reports IDs and we should not reflect the new id over other parts of the system for example the UI, and assuming that we are using any relational database (Postgres) since we are working with booking that requires high consistency.
Also assuming that when we don't have a customs id we will fall back to the database id.
And it would be a good idea to propagate that new custom id into other parts of the application as it will make it easier for the users to use the same custom id.

My task breakdown would go as follows:
1. A quick spike to check the code
    * acceptance criteria:
        * Validate the flow of reports generation
        * Locate where we need to change the new id display
        * Verify that it won't break other logic
        * Make sure that there is enough test coverage
    * Implementation details: none
    * ETA: 3
2. Add migration file to the database
    * Implementation details:
        * Add a new migration file that alters the users' table by adding a new column called reporting_id
        * Add a unique index over that field to fasten the retrieval and improve the data integrity
        * This task should be deployed asap
    * acceptance criteria:
        * The new field reflected in the database
    * ETA: 2
3. Add custom id handling in BE
    * Implementation details:
        * Add test cases (TDD)
            * for missing report_id update over the user endpoint
            * passing invalid id
            * passing duplicate id
            * passing correct one
        * Validate the report_id assuming that we are handling it as a required field
        * Verify the report_id is not duplicate, could be as part of insertion and failure due to DB's duplicate error instead of a separate fetch check (faster and reduce the load over the DB this way)
        * Add monitoring over the endpoint status code and latency.
    * acceptance criteria:
        * the endpoint should accept and require the new field (report_id) and in case of missing should return a 400 status code.
    * ETA: 3
4. (FE) Update custom id page
    * Implementation details: (assuming that we are using a web app and there is a page that handles user data and the ones who want to add the report_id have access to it)
        * Update the form fields to have a report_id field and validate the type to be a string of 12 chars
    * acceptance criteria:
        * The new field reflected in the form
        * The validation messages work properly with the rest of the page
    * ETA: 3
5. Apply the custom ID to generated reports
    * Implementation details:
        * update the test cases
            * Assuming that there are already test cases that cover users with no report_id, then we would only add a new test case with a user that has a report_id
        * Update the retrieval of the user details to include the new field called the report_id
        * Use the report_id if exists if not use the default database id.
    * acceptance criteria:
        * when a user has a report id it should be reflected in the generated report if not use the database id.
    * ETA: 2

Execution notes:
*  Tasks #2, #3 should be deployed before #4
*  The work over #3 and #4 could be parallelized if the update over the endpoint is established before the work
