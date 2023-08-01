<?php

namespace SavvyTheme\Controllers;

/**
 * The Structured Data Controller Class
 *
 * @author Yaidier Perez
 * */

class StructuredDataController {

    static public function init() {

    }

    static public function get_schema_errors( array $review_schema_data ) {
        $error_message = '';

        if( isset( $review_schema_data['missing_fields'] ) ) {
            $error_message .= '<h4>The following fields are missing</h4><ul>';
            foreach( $review_schema_data['missing_fields'] as $missing_field ){
                $error_message .= '<li>' . $missing_field . '</li>';
            }

            $error_message .= '</ul>';
        }

        return $error_message;
    }
}