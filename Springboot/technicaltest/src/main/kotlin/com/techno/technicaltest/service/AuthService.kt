package com.techno.technicaltest.service

import com.techno.technicaltest.domain.dto.response.ResBaseDto

interface Auth {
    fun authToken() : ResBaseDto<Any>
}